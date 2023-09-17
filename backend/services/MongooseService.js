
class MongooseService {
    constructor(Model) {
        this.model = Model
    }

    aggregate(pipeline) {
        return this.model.aggregate(pipeline).exec()
    }

    create(body) {
        return this.model.insertMany(body)
    }

    count(query) {
        return this.model.count(query).exec()
    }

    delete(id) {
        this.model.findByIdAndDelete(id).exec()
    }

}

module.exports = MongooseService