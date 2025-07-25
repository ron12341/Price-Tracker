import unittest
from unittest.mock import patch, Mock
from scrapers.scrape_walmart import scrape_walmart
import requests

class TestScrapeWalmart(unittest.TestCase):
    @patch('requests.get')
    def test_successful_scrape_with_price_and_image(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body><span itemprop="price">$10.99</span><img class="db" src="https://example.com/image.jpg"></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.walmart.com/product'
        result = scrape_walmart(url)
        self.assertEqual(result, ('10.99', 'https://example.com/image.jpg'))

    @patch('requests.get')
    def test_successful_scrape_with_price_but_no_image(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body><span itemprop="price">$10.99</span></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.walmart.com/product'
        result = scrape_walmart(url)
        self.assertEqual(result, ('10.99', None))

    @patch('requests.get')
    def test_successful_scrape_with_no_price_but_image(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body><img class="db" src="https://example.com/image.jpg"></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.walmart.com/product'
        result = scrape_walmart(url)
        self.assertEqual(result, ('N/A', 'https://example.com/image.jpg'))

    @patch('requests.get')
    def test_successful_scrape_with_no_price_and_no_image(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.walmart.com/product'
        result = scrape_walmart(url)
        self.assertEqual(result, ('N/A', None))

    @patch('requests.get')
    def test_request_exception(self, mock_get):
        mock_get.side_effect = requests.exceptions.RequestException('Mocked exception')
        url = 'https://www.walmart.com/product'
        result = scrape_walmart(url)
        self.assertEqual(result, ('N/A', None))

    @patch('requests.get')
    def test_general_exception(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body><span itemprop="price">$10.99</span></body></html>'
        mock_get.return_value = mock_response
        with patch('scrapers.scrape_walmart.BeautifulSoup') as mock_bs:
            mock_bs.side_effect = Exception('Mocked exception')
            url = 'https://www.walmart.com/product'
            result = scrape_walmart(url)
            self.assertEqual(result, ('N/A', None))

    def test_empty_url(self):
        url = ''
        result = scrape_walmart(url)
        self.assertEqual(result, ('N/A', None))

    def test_invalid_url(self):
        url = 'invalid_url'
        result = scrape_walmart(url)
        self.assertEqual(result, ('N/A', None))

if __name__ == '__main__':
    unittest.main()