import unittest
from unittest.mock import patch, Mock
from scrapers.scrape_canada_computers import scrape_canada_computers
import requests
from bs4 import BeautifulSoup

class TestScrapeCanadaComputers(unittest.TestCase):
    @patch('requests.get')
    def test_successful_scrape_with_price_and_image(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body><div class="product-price"><div class="current-price"><span itemprop="price">$10.99</span></div></div><img itemprop="image" src="image_url"></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.canadacomputers.com/product'
        result = scrape_canada_computers(url)
        self.assertEqual(result, ('10.99', 'image_url'))

    @patch('requests.get')
    def test_successful_scrape_with_price_but_no_image(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body><div class="product-price"><div class="current-price"><span itemprop="price">$10.99</span></div></div></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.canadacomputers.com/product'
        result = scrape_canada_computers(url)
        self.assertEqual(result, ('10.99', None))

    @patch('requests.get')
    def test_successful_scrape_with_no_price_but_image(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body><img itemprop="image" src="image_url"></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.canadacomputers.com/product'
        result = scrape_canada_computers(url)
        self.assertEqual(result, ('N/A', 'image_url'))

    @patch('requests.get')
    def test_successful_scrape_with_no_price_and_no_image(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.canadacomputers.com/product'
        result = scrape_canada_computers(url)
        self.assertEqual(result, ('N/A', None))

    @patch('requests.get')
    def test_request_exception(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 404
        mock_get.return_value = mock_response
        url = 'https://www.canadacomputers.com/product'
        result = scrape_canada_computers(url)
        self.assertEqual(result, ('N/A', None))

    def test_general_exception(self):
        url = 'https://www.canadacomputers.com/product'
        with patch('requests.get', side_effect=Exception('Test exception')):
            result = scrape_canada_computers(url)
            self.assertEqual(result, ('N/A', None))

    def test_empty_url(self):
        url = ''
        result = scrape_canada_computers(url)
        self.assertEqual(result, ('N/A', None))

    def test_invalid_url(self):
        url = ' invalid_url '
        result = scrape_canada_computers(url)
        self.assertEqual(result, ('N/A', None))

if __name__ == '__main__':
    unittest.main()