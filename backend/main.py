import os
from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from hexbytes import HexBytes
from web3 import Web3

from dotenv import load_dotenv
load_dotenv()


class HexJsonEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, HexBytes):
            return obj.hex()
        return super().default(obj)


try:
    import json
except ImportError:
    import simplejson as json


class Connection:
    def __init__(self) -> None:
        self.infura_url = f'https://goerli.infura.io/v3/{os.getenv("API_KEY")}'
        self.web3 = Web3(Web3.HTTPProvider(self.infura_url))
        self.contract_address = "0x06C9f7c92A3ed9B26234Fd926844E5E581c0b685"
        self.contract_abi = json.loads('[{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_type","type":"string"},{"internalType":"string","name":"_url","type":"string"},{"internalType":"address","name":"owner","type":"address"}],"name":"store","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"retrieve","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"item_type","type":"string"},{"internalType":"string","name":"img_url","type":"string"},{"internalType":"address","name":"owner","type":"address"}],"internalType":"struct tf.Item[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"}]')
        self.contract = self.web3.eth.contract(
            address=self.contract_address, abi=self.contract_abi)

        self.from_account = "0xa106139Dbd0befaC56be421426BC5376c5473515"
        self.private_key = f'{os.getenv("PRIVATE_KEY")}'

    def fetch_items(self):
        items = self.contract.functions.retrieve().call()
        return items

    def create_item(self, name, img_url, type, owner):
        tx = self.contract.functions.store(
            name, img_url, type, owner).build_transaction()
        tx.update(
            {'nonce': self.web3.eth.get_transaction_count(self.from_account)})

        tx['gas'] = self.contract.functions.store(name, img_url, type, owner).estimateGas()
        signed_tx = self.web3.eth.account.sign_transaction(tx, self.private_key)
        tx_hash = self.web3.eth.send_raw_transaction(signed_tx.rawTransaction)
        print("Transaction hash:", self.web3.toHex(tx_hash))
        transaction_receipt = self.web3.eth.wait_for_transaction_receipt(tx_hash)
        print("Transaction receipt:\n", transaction_receipt)

        return transaction_receipt


app = Flask(__name__)
CORS(app)
blockchain = Connection()


@app.route("/fetch-items", methods=["GET"])
def fetch_items():
    items = blockchain.fetch_items()
    return jsonify(items), 200


@app.route("/create-item", methods=["POST"])
def create_item():
    data = request.form
    receipt = blockchain.create_item(
        data["name"], data["imageUrl"], data["type"], data["owner"])

    return jsonify(str(receipt)), 200


# Run the flask server locally
app.run(host="127.0.0.1", port=5000, debug=True)
