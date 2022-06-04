import scrapy
from pymongo import MongoClient


client = MongoClient("mongodb+srv://dataintergration:nhom7@cluster0.x0eh0.mongodb.net/test?retryWrites=true&w=majority")

database =client['DataIntegration']
newshop_collections = database['newshop']


class BookSpider(scrapy.Spider):
    name = 'book'
    allowed_domains = ['newshop.vn']
    start_urls = ['https://newshop.vn/sach']

    def parse(self, response):
        for item_url in response.xpath('//div[@class="item"]/a/@href').extract():
            yield scrapy.Request(response.urljoin(item_url), callback=self.parse_book)

        next_page = response.xpath('//div[@class="category-paginate"]/ul/li/a[@rel="next"]/@href').extract_first()
        if next_page:
            yield scrapy.Request(response.urljoin(next_page), callback=self.parse)

    def parse_book(self, response):
        data = {
            '_id': response.url,
            'url': response.url,
            'image_url': response.xpath('//div[@class="preview-image"]/img/@src').get(),
            'name': response.xpath('//h1[@class="product-title"]/text()').get(),
            'author_name': response.xpath('//td[text()="Tác Giả"]/following-sibling::td/a/h3/text()').get(),
            'price': response.xpath('//span[@class="price sale-price"]/text()').get(),
            'provider': response.xpath('//td[text()="Công ty phát hành"]/following-sibling::td/a/h3/text()').get(),
            'publisher': response.xpath('//td[text()="Nhà Xuất bản"]/following-sibling::td/a/h3/text()').get(),
            'num_page': response.xpath('//td[text()="Số Trang"]/following-sibling::td/a/h3/text()').get(),
            'cover_type': response.xpath('//td[text()="Bìa"]/following-sibling::td/a/h3/text()').get(),
            'size': response.xpath('//td[text()="Kích Thước"]/following-sibling::td/a/h3/text()').get(),
            'release_year': response.xpath('//td[text()="Năm Xuất Bản"]/following-sibling::td/a/h3/text()').get()
        }

        if data['price'] is not None:
            data['price'] = data['price'][:-1]

        newshop_collections.replace_one({"_id": data["_id"]}, data, upsert=True)