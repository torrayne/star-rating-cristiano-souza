/************************************************************************
 * YOU DO NOT NEED TO MODIFY THIS FILE OR ANY OTHER FILE IN THIS FOLDER *
 ************************************************************************/

import express from 'express';
import * as db from './db.js';

const app = express();

app.use(express.json());

app.get('/api/ratings/:productId', (req, res) => {
    const productId = req.params.productId;
    const ratings = db.getRatingsForProduct(+productId);
    res.json({data: ratings});
});

app.post('/api/ratings', (req, res) => {
    const { productId: productIdString, ratingValue: ratingString } = req.body;
    const productId = +productIdString;
    const ratingValue = +ratingString;
    
    const errors  = [];
    if (!productId) {
        errors.push('productId is required');
    } else if (!db.productExists(productId)) {
        errors.push(`product "${productId}" does not exist`);
    }
        
    if (!ratingValue) {
        errors.push('ratingValue is required, and must be a number between 1 and 5');
    } else if (ratingValue < 1 || ratingValue > 5) {
        errors.push('ratingValue must be between 1 and 5');
    }

    if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }

    const newRating = db.saveNewRating(productId, ratingValue);

    res.status(201).json({ data: newRating });
});

app.put('/api/ratings/:ratingId', (req, res) => {
    const { ratingId } = req.params;
    const { ratingValue: ratingString } = req.body;
    console.log(ratingString)
    const ratingValue = +ratingString;
    
    const errors  = [];
    if (!db.ratingExists(ratingId)) {
        errors.push(`ratingId "${ratingId}" does not exist`);
    }
    if (!ratingValue) {
        errors.push(`ratingValue "${ratingString}" is not valid`);
    } else if (ratingValue < 1 || ratingValue > 5) {
        errors.push('ratingValue must be between 1 and 5');
    }
    if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }

    const updatedSuccessfully = db.updateRating(ratingId, ratingValue);
    if (updatedSuccessfully) {
        res.status(200).json({ data: { ratingId, rating: ratingValue } });
    } else {
        res.status(500).json({ errors: [`An unknown error occurred while updating rating "${ratingId}" to "${ratingValue}"`] });
    }
});

export const handler = app;
