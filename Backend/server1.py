# from flask import Flask
# from flask import request, make_response, jsonify
# from flask_mysqldb import MySQL
# from flask_cors import CORS
# import datetime, json, hashlib, os, jwt

from flask import Flask, json, jsonify, request, make_response
import jwt
import hashlib
import os
from datetime import datetime
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask_pymongo import PyMongo
import math
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb://127.0.0.1:27017/briskon"
mongo = PyMongo(app)


def md5_hash(string):
    hash = hashlib.md5()
    hash.update(string.encode('utf-8'))
    return hash.hexdigest()

def generate_salt():
    salt = os.urandom(16)
    return salt.hex()

# For User signup 
@app.route('/signup', methods=['POST'])
def signup():
    user_name = request.headers.get('user_name')
    email = request.headers.get('email')
    mobile = request.headers.get('mobile')
    password = request.headers.get('password')
    # if request.method == 'POST':
    #     f = request.files['user_image']
    #     location = "static/img/" + f.filename
    #     f.save(location)
    flag = False
    salt = generate_salt()
    password_hash = md5_hash((password) + salt)
    
    response = mongo.db.users.find_one({"email": email})

    if response:
        result = jsonify({"duplicate": "Email id already exisist"})
    else:
        user_id = mongo.db.users.insert({
            "user_name": user_name,
            "email": email,
            "mobile":mobile,
            "password_salt":salt,
            "password_hash":password_hash,
            "password":password
        })

        new_user = mongo.db.users.find_one({"_id": user_id})
        result = jsonify({"success": new_user["email"] + " registered"})
    return result

# For Admin signup 
@app.route('/admin.signup', methods=['POST'])
def adminsignup():
    admin_name = request.headers.get('admin_name')
    admin_email = request.headers.get('admin_email')
    admin_mobile = request.headers.get('admin_mobile')
    password = request.headers.get('password')
    # if request.method == 'POST':
    #     f = request.files['admin_image']
    #     location = "static/img/" + f.filename
    #     f.save(location)
    flag = False
    salt = generate_salt()
    password_hash = md5_hash((password) + salt)

    response = mongo.db.admins.find_one({"admin_email": admin_email})

    if response:
        result = jsonify({"duplicate": "Email id already exisist"})
    else:
        user_id = mongo.db.admins.insert({
            "admin_name": admin_name,
            "admin_email": admin_email,
            "admin_mobile":admin_mobile,
            "password_salt":salt,
            "password_hash":password_hash,
            "password":password
        })

        new_admin = mongo.db.admins.find_one({"_id": user_id})
        result = jsonify({"success": new_admin["admin_email"] + " registered"})
    return result

# # For Admin Login 
# @app.route('/admin.login', methods=["POST"])
# def adminlogin():
#     admin_email = request.json["admin_email"]
#     password = request.json["password"]
#     flag = False
    
#     results = mongo.db.admins.find({})
    
#     for item in results:
#         if admin_email == str(item["admin_email"]) and str(item["password_hash"]) == str(md5_hash(password+item["password_salt"])):
#             flag = True
#             encoded_jwt=jwt.encode({"admin_id":item["admin_id"],"admin_name":item["admin_name"],"admin_email":item["admin_email"],"admin_mobile":item["admin_mobile"]}, 'secretkey', algorithm='HS256').decode("utf-8")
#     if flag == True:
#         return json.dumps(str(encoded_jwt))
#     else:
#         return json.dumps("Wrong Password")

# # For User Login 
# @app.route('/login', methods=["POST"])
# def login():
#     email = request.json["email"]
#     password = request.json["password"]
#     flag = False
#     cursor = mysql.connection.cursor()
#     cursor.execute("""select * from users""")
#     results = cursor.fetchall()
#     mysql.connection.commit()
#     cursor.close()
#     for item in results:
#         if str(email) == str(item["email"]) and str(item["password_hash"]) == str(md5_hash(password+item["password_salt"])):
#             flag = True
#             encoded_jwt = jwt.encode({"user_id":item["user_id"],"user_name":item["user_name"],"email":item["email"],"mobile":item["mobile"],"user_image":item["user_image"]}, 'secretkey', algorithm='HS256').decode("utf-8")
#     if flag == True:
#         return json.dumps(str(encoded_jwt))
#     else:
#         return json.dumps("Wrong Password")

# #Adding Product By Admin
# @app.route('/addproduct',methods=['POST'])
# def addproduct():
#     prod_name = request.headers.get('prod_name')
#     prod_price = request.headers.get('prod_price')
#     prod_cat = request.headers.get('prod_cat')
#     prod_description = request.headers.get('prod_description')
#     no_of_unit = request.headers.get('no_of_unit')
#     if request.method == 'POST':
#         f = request.files['prod_image']
#         location = "static/img/" + f.filename
#         f.save(location)
#     cursor = mysql.connection.cursor()
#     cursor.execute(""" INSERT INTO products(prod_name, prod_price, prod_cat, prod_description, prod_image, no_of_unit) values (%s,%s,%s,%s,%s,%s)""",[prod_name,prod_price,prod_cat,prod_description,location, no_of_unit])
#     mysql.connection.commit()
#     cursor.close()
#     return json.dumps("Registerd Successfully")

# #Edit By Admin
# @app.route('/edit', methods=['POST'])
# def edit():
#     prod_id = request.headers.get('prod_id')
#     prod_name = request.headers.get('prod_name')
#     prod_price = request.headers.get('prod_price')
#     prod_cat = request.headers.get('prod_cat')
#     prod_description = request.headers.get('prod_description')
#     if request.method == 'POST':
#         f = request.files['prod_image']
#         location = 'static/img' + f.filename
#         f.save(location)
#     cursor = mysql.connection.cursor()
#     cursor.execute("""update products set prod_name =(%s),prod_price =(%s), prod_cat=(%s), prod_description = (%s), prod_image = (%s) where prod_id=(%s)""",[prod_name,prod_price,prod_cat,prod_description,location,prod_id])
#     mysql.connection.commit()
#     cursor.close()
#     return json.dumps("Edited Successfully")

# #Delete By Admin
# @app.route('/delete',methods=["POST"])
# def delete():
#     prod_id =request.headers.get('prod_id')
#     cursor = mysql.connection.cursor()
#     cursor.execute("""delete from products where prod_id =(%s)""",[prod_id])
#     mysql.connection.commit()
#     cursor.close()
#     return json.dumps("Delete Successfully")
    
# #Fetchinng all data
# @app.route('/home')
# def home():
#     page = request.args.get("page", default = 1, type = int)
#     return json.dumps(pagination(page))

# #Pagination for home page
# def pagination(page):
#     cursor = mysql.connection.cursor()
#     cursor.execute("""select * from products""")
#     results = cursor.fetchall()
#     cursor.close()
#     items = []
#     for item in results:
#         items.append(item)
#     total_pages = len(items)//2+1
#     total_users = len(items)
#     return {
#         "total_pages": total_pages,
#         "total_users": total_users,
#         "page": page,
#         "data": items[(page*2)-2: page*2],
#         "per_page": 2
#         }

# #Details of a particular product
# @app.route('/details')
# def details():
#     prod_id = request.headers.get('prod_id')
#     cursor = mysql.connection.cursor()
#     cursor.execute("""select * from products where prod_id = (%s)""",[prod_id])
#     result = cursor.fetchall()
#     cursor.close()
#     items = []
#     for item in result:
#         items.append(item)
#     return json.dumps(items)        

# #Distinct Category
# @app.route('/distcat')
# def distcat():
#     prod_cat = request.headers.get('prod_cat')
#     cursor = mysql.connection.cursor()
#     cursor.execute("""select distinct prod_cat from products""" )
#     category = cursor.fetchall()
#     cursor.close()
#     items = []
#     for item in category:
#         items.append(item)
#     cursor = mysql.connection.cursor()
#     cursor.execute("""select * from products where prod_cat = (%s)""",[prod_cat])
#     result = cursor.fetchall()
#     cursor.close()
#     data = []
#     for i in result:
#         data.append(i)
#     return json.dumps({
#         "items": items,
#         "datas": data
#     })

# #Search
# @app.route('/search')
# def search():
#     prod_name = request.headers.get('prod_name')
#     cursor = mysql.connection.cursor()
#     search_string = f"%{prod_name}%"
#     cursor.execute("""select * from products where prod_name like (%s)""", [search_string])
#     result = cursor.fetchall()
#     mysql.connection.commit()
#     cursor.close()
#     return json.dumps(result)

# #Add to Cart
# @app.route('/addtocart',methods=['POST'])
# def addcart():
#     cart_prod_id = request.headers.get('cart_prod_id')
#     cart_user_id = request.headers.get('cart_user_id')
#     cart_prod_name = request.headers.get('cart_prod_name')
#     cart_prod_price = request.headers.get('cart_prod_price')
#     cart_prod_description = request.headers.get('cart_prod_description')
#     cart_prod_cat = request.headers.get('cart_prod_cat')
#     cursor = mysql.connection.cursor()
#     cursor.execute("""insert into cart(cart_prod_id, cart_user_id, cart_prod_name, cart_prod_price, cart_prod_description, cart_prod_cat) values(%s,%s,%s,%s,%s,%s)""",[cart_prod_id,cart_user_id,cart_prod_name,cart_prod_price,cart_prod_description,cart_prod_cat])
#     mysql.connection.commit()
#     cursor.close()
#     return json.dumps("Added to cart")
    
# #Accessing Token
# @app.route('/gettoken')
# def gettoken():
#     auth_header = request.headers.get('Authorization')
#     token_encoded = auth_header.split(' ')[1]
#     decode_data = jwt.decode(token_encoded, 'secretkey', algorithms=['HS256'])
#     return json.dumps(decode_data)

# #Accessing Cart data
# @app.route('/viewcart',methods=['POST'])
# def viewcart():
#     cart_user_id = request.headers.get('cart_user_id')
#     cursor = mysql.connection.cursor()
#     cursor.execute("""select * from cart where cart_user_id  = (%s)""", [cart_user_id])
#     result = cursor.fetchall()
#     cursor.close()
#     data = []
#     for i in result:
#         data.append(i)
#     return json.dumps(data)

# @app.route('/removecart', methods=['POST'])
# def removecart():
#     cart_id = request.json['cart_id']
#     cursor = mysql.connection.cursor()
#     cursor.execute("""delete from cart where cart_id = (%s)""",[cart_id])
#     mysql.connection.commit()
#     cursor.close()
#     return json.dumps("Delete Successfully")

# @app.route('/buy', methods=['POST'])
# def buy():
#     ordered_prod_id = request.headers.get('ordered_prod_id')
#     ordered_user_id = request.headers.get('ordered_user_id')
#     buyer_name = request.headers.get('buyer_name')
#     address = request.headers.get('address')
#     mobile = request.headers.get('mobile')
#     cursor = mysql.connection.cursor()
#     cursor.execute("""insert into orders (ordered_prod_id, ordered_user_id,buyer_name,address,mobile) values (%s,%s,%s,%s,%s)""", [ordered_prod_id, ordered_user_id, buyer_name,address,mobile])
#     mysql.connection.commit()
#     cursor.close()
#     return json.dumps("Purchsed")

# @app.route('/orderdetails', methods=['GET'])
# def orderDetails():
#     ordered_user_id=request.headers.get('ordered_user_id')
#     # print(ordered_user_id)
#     cursor = mysql.connection.cursor()
#     cursor.execute("""select buyer_name, ordered_at, prod_name, prod_price, prod_description, prod_cat from orders join products on orders.order_id = products.prod_id  where ordered_user_id = (%s)""",[ordered_user_id])
#     result = cursor.fetchall()
#     cursor.close()
#     data = []
#     for i in result:
#         i["ordered_at"] = datetime.datetime.strftime((i["ordered_at"]), "%d %b, %Y")
#         data.append(i)
#     return json.dumps(data)

if __name__ == "__main__":
    app.run(debug = True)