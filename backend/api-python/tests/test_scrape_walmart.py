import unittest
from unittest.mock import patch, Mock
from scrapers.scrape_walmart import scrape_walmart

class TestScrapeWalmart(unittest.TestCase):
    @patch('requests.get')
    def test_successful_scrape_with_price(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body><span itemprop="price">$10.99</span></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.walmart.com/product'
        self.assertEqual(scrape_walmart(url), '$10.99')

    @patch('requests.get')
    def test_successful_scrape_without_price(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.walmart.com/product'
        self.assertEqual(scrape_walmart(url), 'N/A')

    @patch('requests.get')
    def test_request_exception(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 404
        mock_get.return_value = mock_response
        url = 'https://www.walmart.com/product'
        self.assertEqual(scrape_walmart(url), 'N/A')

    @patch('requests.get')
    def test_general_exception(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = '<html><body><span itemprop="price">$10.99</span></body></html>'
        mock_get.return_value = mock_response
        url = 'https://www.walmart.com/product'
        with patch('scrapers.scrape_walmart.BeautifulSoup') as mock_bs:
            mock_bs.side_effect = Exception('Mocked exception')
            self.assertEqual(scrape_walmart(url), 'N/A')

    def test_empty_url(self):
        url = ''
        result = scrape_walmart(url)
        self.assertEqual(result, 'N/A')

    def test_invalid_url(self):
        url = 'invalid_url'
        result = scrape_walmart(url)
        self.assertEqual(result, 'N/A')

if __name__ == '__main__':
    unittest.main()