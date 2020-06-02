import React, { useEffect, useState } from 'react'
import { db } from '../FirebaseConfig'

const Favorites = () => {

    const addTest = () => {
        db.collection('fights2Watch').add({
            redCorner:{
                name:'Tony',
                surname:'Ferguson',
                img:'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_results_athlete_headshot/s3/2018-10/FERGUSON_TONY.png?XZbhsJDLSpgWMEGXlv6nI0I0w8YLkVZu&itok=0qimgJWA',
                rank:1,
            },
            blueCorner:{
                name:'Justin',
                surname:'Gaethje',
                img:'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_results_athlete_headshot/s3/2018-10/GAETHJE_JUSTIN.png?C8qs36qPJ.UYiXrU7tII.vzSUvlmvsNO&itok=m5KCHeBr',
                rank:4,
            }
        })
    }

    useEffect(() => {
    })

    return(
        <div>
            <h1 onClick={() => addTest()}>hei</h1>
        </div>
    )
}

export default Favorites