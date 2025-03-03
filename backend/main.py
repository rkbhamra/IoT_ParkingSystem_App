from routes import create_app

app = create_app()


if __name__ == '__main__':
    app.run(host='192.168.2.48', port=5000, debug=True)
