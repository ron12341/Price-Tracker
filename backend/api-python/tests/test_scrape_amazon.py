import unittest
from unittest.mock import patch, Mock
from scrapers.scrape_amazon import scrape_amazon
import requests

class TestScrapeAmazon(unittest.TestCase):

    @patch('requests.get')
    def test_successful_scrape_with_price_and_image(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body><div id="a-offscreen">$10.99</div><img id="landingImage" src="image_url"></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.amazon.com/product'
        result = scrape_amazon(url, 'image_url' )
        self.assertEqual(result, ('10.99', 'image_url'))

    @patch('requests.get')
    def test_successful_scrape_with_price_but_no_image(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body><div id="a-offscreen">$10.99</div></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.amazon.com/product'
        result = scrape_amazon(url, None)
        self.assertEqual(result, ('10.99', None))

    @patch('requests.get')
    def test_successful_scrape_with_no_price_but_image(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body><img id="landingImage" src="image_url"></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.amazon.com/product'
        result = scrape_amazon(url, 'image_url')
        self.assertEqual(result, ('N/A', 'image_url'))

    @patch('requests.get')
    def test_successful_scrape_with_no_price_and_no_image(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.amazon.com/product'
        result = scrape_amazon(url, None)
        self.assertEqual(result, ('N/A', None))

    @patch('requests.get')
    def test_request_exception(self, mock_get):
        mock_get.side_effect = requests.exceptions.RequestException('Mocked exception')
        url = 'https://www.amazon.com/product'
        result = scrape_amazon(url, None)
        self.assertEqual(result, ('N/A', None))

    @patch('requests.get')
    def test_general_exception(self, mock_get):
        mock_get.side_effect = Exception('Mocked exception')
        url = 'https://www.amazon.com/product'
        result = scrape_amazon(url, None)
        self.assertEqual(result, ('N/A', None))

    def test_empty_url(self):
        url = ''
        result = scrape_amazon(url, None)
        self.assertEqual(result, ('N/A', None))

    def test_invalid_url(self):
        url = 'invalid_url'
        result = scrape_amazon(url, None)
        self.assertEqual(result, ('N/A', None))

if __name__ == '__main__':
    unittest.main()