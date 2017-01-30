from flask import Flask, jsonify, request
import config
import pg

app = Flask(__name__)
db = pg.DB(
    host=config.DBHOST,
    user=config.DBUSER,
    passwd=config.DBPASS,
    dbname=config.DBNAME
)


@app.route('/')
def home():
    return app.send_static_file('index.html')


@app.route('/tasks')
def list_tasks():
    results = db.query('select * from task order by id').dictresult()
    return jsonify(results)


@app.route('/add_task', methods=['POST'])
def add_task():
    description = request.form.get('task')
    result = db.insert('task', description=description)
    return jsonify(result)


@app.route('/mark_task', methods=['POST'])
def mark_task():
    task = str(request.form.get('task'))
    sql = ("update task set done = NOT done WHERE description = $1")
    result = db.query(sql, task)
    return jsonify(result)


@app.route('/delete', methods=['POST'])
def delete():
    del_bool = request.form.get('delete')
    print del_bool
    if del_bool:
        sql = ("delete from task where done = true")
        result = db.query(sql)
        return jsonify(result)

if __name__ == '__main__':
    app.secret_key = config.SECRET_KEY
    app.config['DEBUG'] = config.DEBUG
    app.run()
