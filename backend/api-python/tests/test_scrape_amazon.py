import unittest
from unittest.mock import patch, Mock
import requests
from scrapers.scrape_amazon import scrape_amazon

class TestScrapeAmazon(unittest.TestCase):
    @patch('requests.get')
    def test_successful_scrape_corePriceDisplay_desktop_feature_div(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body><div id="corePriceDisplay_desktop_feature_div">$10.99</div></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.amazon.com/product'
        self.assertEqual(scrape_amazon(url), '10.99')

    @patch('requests.get')
    def test_successful_scrape_priceblock_ourprice(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body><div id="priceblock_ourprice">$10.99</div></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.amazon.com/product'
        self.assertEqual(scrape_amazon(url), '10.99')

    @patch('requests.get')
    def test_successful_scrape_priceblock_saleprice(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body><div id="priceblock_saleprice">$10.99</div></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.amazon.com/product'
        self.assertEqual(scrape_amazon(url), '10.99')

    @patch('requests.get')
    def test_successful_scrape_priceblock_dealprice(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body><div id="priceblock_dealprice">$10.99</div></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.amazon.com/product'
        self.assertEqual(scrape_amazon(url), '10.99')

    @patch('requests.get')
    def test_successful_scrape_a_offscreen(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body><div class="a-offscreen">$10.99</div></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.amazon.com/product'
        self.assertEqual(scrape_amazon(url), '10.99')

    @patch('requests.get')
    def test_successful_scrape_a_price_whole(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body><div class="a-price-whole">$10.99</div></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.amazon.com/product'
        self.assertEqual(scrape_amazon(url), '10.99')

    @patch('requests.get')
    def test_unsuccessful_scrape(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.amazon.com/product'
        self.assertEqual(scrape_amazon(url), 'N/A')

    @patch('requests.get')
    def test_request_exception(self, mock_get):
        mock_get.side_effect = requests.exceptions.RequestException('Mocked exception')
        url = 'https://www.amazon.com/product'
        self.assertEqual(scrape_amazon(url), 'N/A')

    @patch('requests.get')
    def test_general_exception(self, mock_get):
        mock_get.side_effect = Exception('Mocked exception')
        url = 'https://www.amazon.com/product'
        self.assertEqual(scrape_amazon(url), 'N/A')

if __name__ == '__main__':
    unittest.main()