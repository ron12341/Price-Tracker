import unittest
from unittest.mock import patch, Mock
from scrapers.scrape_amazon import scrape_amazon
import requests

class TestScrapeAmazon(unittest.TestCase):
    @patch('requests.get')
    def test_successful_scrape_a_offscreen(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body><div id="a-offscreen">$10.99</div></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.amazon.com/product'
        self.assertEqual(scrape_amazon(url), '10.99')

    @patch('requests.get')
    def test_successful_scrape_a_price_whole(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body><div id="a-price-whole">$10.99</div></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.amazon.com/product'
        self.assertEqual(scrape_amazon(url), '10.99')

    @patch('requests.get')
    def test_successful_scrape_without_price(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.amazon.com/product'
        self.assertEqual(scrape_amazon(url), 'N/A')

    @patch('requests.get')
    def test_successful_scrape_a_offscreen_but_empty(self, mock_get):
        mock_response = Mock()
        mock_response.raise_for_status = Mock()
        mock_response.text = '<html><body><div id="a-offscreen">   </div></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.amazon.com/product'
        result = scrape_amazon(url)
        self.assertEqual(result, 'N/A')

    @patch('requests.get')
    def test_successful_scrape_a_price_whole_but_empty(self, mock_get):
        mock_response = Mock()
        mock_response.raise_for_status = Mock()
        mock_response.text = '<html><body><div id="a-price-whole">   </div></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.amazon.com/product'
        result = scrape_amazon(url)
        self.assertEqual(result, 'N/A')

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

    @patch('requests.get')
    def test_raise_for_status_error(self, mock_get):
        mock_response = Mock()
        mock_response.raise_for_status.side_effect = requests.exceptions.HTTPError("Bad status")
        mock_get.return_value = mock_response
        url = 'https://www.amazon.com/product'
        result = scrape_amazon(url)
        self.assertEqual(result, 'N/A')

    def test_empty_url(self):
        url = ''
        result = scrape_amazon(url)
        self.assertEqual(result, 'N/A')

    def test_invalid_url(self):
        url = 'invalid_url'
        result = scrape_amazon(url)
        self.assertEqual(result, 'N/A')
    
if __name__ == '__main__':
    unittest.main()