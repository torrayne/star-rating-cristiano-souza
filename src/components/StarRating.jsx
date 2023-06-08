import React, { useEffect, useState } from "react";
import axios from 'axios';
import "../styles.css";

export const StarRatings = (props) => {
    const [average, setAverage] = useState(0);
    const [ratings, setRatings] = useState(null);
    const [userRating, setUserRating] = useState(null);

    //get the ratings array
    useEffect(() => {
        axios.get(`/api/ratings/${props.productId}`)
            .then(function (response) {
                // handle success
                setRatings(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [props.productId])

    // calculating the average
    useEffect(() => {
        if (ratings) {
            const avg = (ratings.reduce((total, current) => {
                return total + current.ratingValue;
            }, 0) / ratings.length);

            setAverage(Math.round(avg));
            //  console.log(avg);
        }
    }, [ratings])

    const setRating = (star) => {
        if (!userRating) {
            axios.post("/api/ratings", {
                "productId": props.productId,
                "ratingValue": star
            }).then(response => {
                setUserRating(response.data.data)
                console.log(response.data);
            })
        } else {
            axios.put(`/api/ratings/${userRating.ratingId}`, {
                "productId": props.productId,
                "ratingValue": star
            }).then(response => {
                setUserRating(userRating => {
                    console.log(userRating);
                    userRating.ratingValue = response.data.data.rating;
                    console.log(userRating);
                    return { ...userRating };
                })
            })
        }
    };

    if (ratings) {
        return (
            <div>
                {[1, 2, 3, 4, 5].map((star, i) => {
                    return (
                        <button key={i} onClick={() => setRating(star)}>

                            {(userRating) ?
                                userRating.ratingValue <= i ?
                                    <span>☆</span> : <span style={{ color: 'green' }}>★</span>
                                :
                                average <= i ?
                                    <span>☆</span> : <span>★</span>
                            }
                        </button>
                    )
                })}
            </div>
        );
    } else {
        return (<p>Error</p>)
    }

};
