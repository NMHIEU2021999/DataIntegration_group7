from distutils.log import error
import json
from tqdm import tqdm
import requests

url_book = "https://tiki.vn/api/personalish/v1/blocks/listings?limit=48&category=8322&page={""}&urlKey={""}"
list_key = [
    "nha-sach-tiki", 
    "sach-van-hoc",
    "sach-kinh-te",
    "sach-truyen-thieu-nhi",
    "sach-ky-nang-song",
    "sach-kien-thuc-tong-hop",
    "khoa-hoc-ky-thuat",
    "lich-su-dia-ly",
    "truyen-tranh",           
 ]

def save_file(data, file_name):
    with open(file_name, 'w') as file:
        json.dump(data, file, indent=4)


def get_url_item(url: str, max_page: int, file_name: str):
    final_data = []
    for key in list_key:
        for i in tqdm(range(1, max_page)):
            try:
                url_temp = url.format(i, key)
                response = requests.get(url_temp, headers={
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"
                })
                data = json.loads(response.text)
                final_data.extend(data['data'])
            except:
                print('error')
    list_url_item = []
    for item in final_data:
          list_url_item.append("https://tiki.vn/" + item['url_path'])

    print(len(list_url_item))
    save_file(list_url_item, file_name)


get_url_item(url_book, max_page=50, file_name='Crawl/Url/tiki/book.json')
