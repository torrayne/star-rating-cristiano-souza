/************************************************************************
 * YOU DO NOT NEED TO MODIFY THIS FILE OR ANY OTHER FILE IN THIS FOLDER *
 ************************************************************************/

import fs from 'fs';
import cuid from 'cuid';

const dataFile = `./_/ratings.json`;

const ratings = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

export function getRatingsForProduct(productId) {
  return ratings.filter((rating) => {
    return rating.productId === productId;
  });
}

export function saveNewRating(productId, ratingValue) {
    const ratingId = cuid();
    const newRating = {
        productId,
        ratingValue,
        ratingId
    };
    
    ratings.push(newRating);
    
    fs.writeFileSync(dataFile, JSON.stringify(ratings, null, 2));

    return newRating;
}

export function updateRating(ratingId, ratingValue) {
    const existingRating = ratings.find((rating) => rating.ratingId === ratingId);
    
    if (existingRating) {
        existingRating.ratingValue = ratingValue;

        fs.writeFileSync(dataFile, JSON.stringify(ratings, null, 2));
        return true;
    } else {
        console.error(`An unknown error occurred while updating rating "${ratingId}" to "${ratingValue}"`);
        return false;
    }
}

export function productExists(productId) {
    return ratings.some(rating => rating.productId === productId);
}

export function ratingExists(ratingId) {
    return ratings.some(rating => rating.ratingId === ratingId);
}
