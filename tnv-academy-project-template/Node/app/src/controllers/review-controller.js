import Review from "../models/review.js";

export const getReviews = async (req,res) => {
    try {
        const review = await Review.findAll({
            
        });
        
        if (review) {
            res.send(review);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const getReview = async (req, res) => {
    try {
        const review = await Review.findOne({
            where: {
                userId: req.params.userId,
                movieId: req.params.movieId,
            }
        });
        
        if (review) {
            res.send(review);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const createReview = async (req, res) => {
    try {
        const review = await Review.create(req.body);
        console.log(req.body)
        res.json({
            "message": "Review Created",
            data: review
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const updateReview = async (req, res) => {
    try {
        const review = await Review.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Review Updated",
            data: rating
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const deleteReview = async (req, res) => {
    try {
        await Review.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Review Deleted"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
