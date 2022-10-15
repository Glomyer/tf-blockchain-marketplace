from flask import Flask, jsonify, request
from flask_cors import CORS
import datetime
import hashlib


try:
    import json
except ImportError:
    import simplejson as json


class Blockchain:

    def __init__(self):
        self.load_chain()

    def load_chain(self):
        with open("blockchain.json", "r") as file:
            data = json.load(file)
            self.chain = data

        if not self.chain:
            self.create_block(proof=1, previous_hash=None, data="Bloco gênese")

    def create_block(self, proof, previous_hash, data):
        if type(data) == type({}):
            data.update({'id': str(len(self.chain) + 1)})

        block = {
            "index": len(self.chain) + 1,
            "timestamp": str(datetime.datetime.now()),
            "data": data,
            "proof": proof,
            "previous_hash": previous_hash,
        }
        
        self.chain.append(block)
        with open("blockchain.json", "w") as file:
            file.write(json.dumps(self.chain, ensure_ascii=False))

        return block

    def get_chain(self):
        self.load_chain()
        return self.chain

    def return_previous_block(self):
        self.load_chain()
        return self.chain[-1]


    def proof_of_work(self, previous_proof):
        new_proof = 1
        check_proof = False

        while check_proof is False:
            hash_operation = hashlib.sha256(
                str(new_proof**2 - previous_proof**2).encode()
            ).hexdigest()
            if hash_operation[:5] == "00000":
                check_proof = True
                print(hash_operation)
            else:
                new_proof += 1

        return new_proof

    def hash(self, block):
        encoded_block = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(encoded_block).hexdigest()

    def chain_valid(self, chain):
        self.load_chain()
    
        previous_block = chain[0]
        block_index = 1

        while block_index < len(chain):
            block = chain[block_index]
            if block["previous_hash"] != self.hash(previous_block):
                return False

            previous_proof = previous_block["proof"]
            proof = block["proof"]
            hash_operation = hashlib.sha256(
                str(proof**2 - previous_proof**2).encode()
            ).hexdigest()

            if hash_operation[:5] != "00000":
                return False
            previous_block = block
            block_index += 1

        return True


app = Flask(__name__)
CORS(app)
blockchain = Blockchain()


@app.route("/create-block", methods=["POST"])
def mine_block():
    data = request.json

    previous_block = blockchain.return_previous_block()
    previous_proof = previous_block["proof"]
    proof = blockchain.proof_of_work(previous_proof)
    previous_hash = blockchain.hash(previous_block)
    block = blockchain.create_block(proof, previous_hash, data)

    response = {
        "index": block["index"],
        "data": block["data"],
        "timestamp": block["timestamp"],
        "proof": block["proof"],
        "previous_hash": block["previous_hash"],
    }

    return jsonify(response), 200


@app.route("/get-chain", methods=["GET"])
def display_chain():
    blockchain_blocks = blockchain.get_chain()
    chain = []
    
    for block in blockchain_blocks:
        encoded_block = json.dumps(block, sort_keys=True).encode()
        block_with_hash = block.copy()
        block_with_hash['hash'] =  hashlib.sha256(encoded_block).hexdigest()
        chain.append(block_with_hash)

    response = {"chain": chain, "length": len(chain)}
    return jsonify(response), 200


@app.route("/is-valid", methods=["GET"])
def valid():
    valid = blockchain.chain_valid(blockchain.chain)

    if valid:
        response = {"message": "The Blockchain is valid."}
    else:
        response = {"message": "The Blockchain is not valid."}
    return jsonify(response), 200


# Run the flask server locally
app.run(host="127.0.0.1", port=5000, debug=True)
