import unittest
from unittest.mock import patch, Mock
from scrapers.scrape_newegg import scrape_newegg
import requests
from bs4 import BeautifulSoup

class TestScrapeNewegg(unittest.TestCase):
    @patch('requests.get')
    def test_successful_scrape_with_price_and_image(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body><a class="product-offer"><strong>$10.99</strong></a><div class="swiper-wrapper"><div class="swiper-slide-visible"><img src="image_url"></div></div></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.newegg.com/product'
        result = scrape_newegg(url)
        self.assertEqual(result, ('10.99', 'image_url'))

    @patch('requests.get')
    def test_successful_scrape_with_price_but_no_image(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body><div class="product-offer"><strong>$10.99</strong></div></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.newegg.com/product'
        result = scrape_newegg(url)
        self.assertEqual(result, ('10.99', None))

    @patch('requests.get')
    def test_successful_scrape_with_no_price_but_image(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body><div class="swiper-wrapper"><div class="swiper-slide-visible"><img src="image_url"></div></div></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.newegg.com/product'
        result = scrape_newegg(url)
        self.assertEqual(result, ("N/A", 'image_url'))

    @patch('requests.get')
    def test_successful_scrape_with_no_price_and_no_image(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.newegg.com/product'
        result = scrape_newegg(url)
        self.assertEqual(result, ("N/A", None))

    @patch('requests.get')
    def test_request_exception(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 404
        mock_get.return_value = mock_response
        url = 'https://www.newegg.com/product'
        result = scrape_newegg(url)
        self.assertEqual(result, ('N/A', None))

    @patch('requests.get')
    def test_general_exception(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.newegg.com/product'
        with patch('bs4.BeautifulSoup', side_effect=Exception('Test exception')):
            result = scrape_newegg(url)
            self.assertEqual(result, ('N/A', None))

    def test_empty_url(self):
        url = ''
        result = scrape_newegg(url)
        self.assertEqual(result, ('N/A', None))

    def test_invalid_url(self):
        url = 'invalid_url'
        result = scrape_newegg(url)
        self.assertEqual(result, ('N/A', None))

if __name__ == '__main__':
    unittest.main()