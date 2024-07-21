import json
from azure.core.credentials import AzureKeyCredential
from azure.ai.formrecognizer import FormRecognizerClient
from flask import Flask, jsonify, request

# Load credentials
credentials = json.load(open('C:/Pratham/Academics/BTech/TY/hackathons/bob_hackathon/backend/credentials.json'))
API_KEY = credentials['API_KEY']
ENDPOINT = credentials['ENDPOINT']

# Initialize the Form Recognizer client
form_recognizer_client = FormRecognizerClient(ENDPOINT, AzureKeyCredential(API_KEY))

app = Flask(__name__)

def parse_line(line):
    """ Parses a line of text into a key-value pair. """
    if ':' in line:
        key, value = line.split(':', 1)
        return key.strip(), value.strip()
    return None, None

def parse_table_cells(cells):
    """ Parses table cells into key-value pairs assuming alternating cells for keys and values. """
    key_value_pairs = {}
    row_data = []
    for cell in cells:
        row_data.append(cell.text.strip())
        if len(row_data) == 2:
            key_value_pairs[row_data[0]] = row_data[1]
            row_data = []
    return key_value_pairs

@app.route('/form_ocr', methods=['GET'])
def get_data():
    link = request.headers.get('link')
    if not link:
        return jsonify({"error": "No link provided"}), 400
    
    try:
        poller = form_recognizer_client.begin_recognize_content_from_url(link)
        form_result = poller.result()
        
        key_value_pairs = {}
        for page in form_result:
            # Extract lines of text
            for line in page.lines:
                text = line.text.strip()
                if text:
                    key, value = parse_line(text)
                    if key and value:
                        key_value_pairs[key] = value

            # Extract table data
            for table in page.tables:
                cells = []
                for cell in table.cells:
                    cells.append(cell)
                table_data = parse_table_cells(cells)
                key_value_pairs.update(table_data)

        return jsonify(key_value_pairs)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
