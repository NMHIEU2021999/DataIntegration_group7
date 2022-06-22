const BookModel = require("../models/Book");
const httpStatus = require("../utils/httpStatus");

const bookController = {};

bookController.search = async (req, res, next) => {
    const options = {
        page: req.query.page || 1,
        limit: req.query.perpage || 12,
    };

    console.log(req.query)
    console.log(req.body)

    var query = {}
    var key = req.body.key || "";
    var priceType = req.body.price || null;
    var author = req.body.author || "";
    var publisher = req.body.publisher || "";
    var year = req.body.year;

    query["name"] = { "$regex": key, "$options": "i" };
    query["author_name"] = { "$regex": author, "$options": "i" };
    if (publisher) query["publisher"] = publisher;
    if (year) query["release_year"] = year;
    if (priceType) {
        var lower_bound = 0;
        var upper_bound = Number.MAX_VALUE;
        switch (priceType) {
            case 1:
                lower_bound = 0;
                upper_bound = 100000;
                break;
            case 2:
                lower_bound = 100000;
                upper_bound = 200000;
                break;
            case 3:
                lower_bound = 200000;
                upper_bound = 300000;
                break;
            case 4:
                lower_bound = 300000;
                upper_bound = 500000;
                break;
            case 5:
                lower_bound = 500000;
                upper_bound = 1000000;
                break;
            case 6:
                lower_bound = 1000000;
                upper_bound = Number.MAX_VALUE;
                break;
        }
        query["$and"] = [
            { "$expr": { "$gte": [{ "$toInt": "$price" }, lower_bound] } },
            { "$expr": { "$lt": [{ "$toInt": "$price" }, upper_bound] } }
        ]
    }


    BookModel.paginate(query, options, function (err, result) {
        if (err) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message: err.message
            });
        }
        return res.status(httpStatus.OK).json({
            data: result
        });
    });
}


bookController.getListAuthor = async (req, res, next) => {
    try {
        let authors = await BookModel.distinct("author_name" , { "author_name" : { $ne : null } } );

        return res.status(httpStatus.OK).json({
            data: authors
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}


bookController.getListPublisher = async (req, res, next) => {
    try {
        let publishers = await BookModel.distinct("publisher" , { "publisher" : { $ne : null } } );

        return res.status(httpStatus.OK).json({
            data: publishers
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}

module.exports = bookController;