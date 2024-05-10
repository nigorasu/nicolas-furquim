from flask import Flask, jsonify, request
import json

app = Flask(__name__)

@app.route('/search', methods=['GET'])
def search():
    # Obtenha o termo de pesquisa da consulta
    search_term = request.args.get('q', '')

    # Leia o arquivo data.json
    with open('data.json', 'r') as file:
        data = json.load(file)

    # Faça a pesquisa nos dados e normalize os resultados
    results = []
    for item in data:
        if search_term.lower() in item['name'].lower():
            # Adicione os resultados normalizados à lista de resultados
            results.append({
                'id': item['id'],
                'name': item['name'],
                'category': item['category']
                # Adicione mais campos conforme necessário
            })

    # Retorne os resultados normalizados em formato JSON
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
