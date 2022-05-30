from scrapy import Spider, Request
import json
from pymongo import MongoClient

client = MongoClient("mongodb+srv://dataintergration:nhom7@cluster0.x0eh0.mongodb.net/test?retryWrites=true&w=majority")

database =client['DataIntegration']
tiki_collections = database['tiki']


class Tiki(Spider):
    name = 'tiki'
    list_book_url = json.load(open('../Url/tiki/book.json', 'r'))

    def start_requests(self):
        for url in self.list_book_url:
            yield Request(url=url, callback=self.parse)

    def parse(self, response, **kwargs):
        data = {
            '_id': response.url,
            'url': response.url,
            'image_url': response.xpath('//meta[@property="og:image"]/@content').get(),
            'name': response.xpath('//h1[@class="title"]/text()').get(),
            'author_name': response.xpath('//span[@class="brand-and-author "]/h6/a/text()').get(),
            'price': response.xpath('//div[@class="product-price__current-price"]/text()').get(),
            'provider': response.xpath('//td[text()="Công ty phát hành"]/following-sibling::td/text()').get(),
            'publisher': response.xpath('//td[text()="Nhà xuất bản"]/following-sibling::td/text()').get(),
            'num_page': response.xpath('//td[text()="Số trang"]/following-sibling::td/text()').get(),
            'cover_type': response.xpath('//td[text()="Loại bìa"]/following-sibling::td/text()').get(),
            'size': response.xpath('//td[text()="Kích thước"]/following-sibling::td/text()').get(),
            'release_year': response.xpath('//td[text()="Ngày xuất bản"]/following-sibling::td/text()').get(),
            'translator': response.xpath('//td[text()="Dịch giả"]/following-sibling::td/text()').get(),
        }

        if(data['price'] is None):
            data['price'] = response.xpath('//div[@class="flash-sale-price"]/span/text()').get()

        if(data['release_year'] is not None):
            data['release_year'] = data['release_year'].split('-')[0]

        data['price'] = data['price'].split(' ')[0]
        # print(data)
        tiki_collections.replace_one({"_id": data["_id"]}, data, upsert=True) 
