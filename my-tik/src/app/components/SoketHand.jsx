'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Draggable from 'react-draggable';
import './Style.css';


import { subscribeToLike, subscribeToChat, subscribeToGift } from '../socketconnection';




export default function SoketHand() {

    const [usernmae, setusernmae] = useState('');
    const [like, setlike] = useState([]);
    const [gift, setgift] = useState([]);
    const [biggift, setbiggift] = useState([]);
    const [comment, setcomment] = useState([]);
   

    useEffect(() => {

        subscribeToLike((data) => {
            // استخدم دالة setLike لتحديث الحالة بطريقة صحيحة
            setlike(prevState => {
                const existingIndex = prevState.findIndex(item => item.nickname === data.nickname);
                if (existingIndex === -1) {
                    // إذا كان العنصر غير موجود، قم بإضافته إلى قائمة الإعجابات
                    return [...prevState, data];
                } else {
                    // إذا كان العنصر موجودًا، قم بتحديث العدد الموجود
                    return prevState.map((item, index) => {
                        if (index === existingIndex) {
                            return { ...item, likeCount: item.likeCount + data.likeCount };
                        }
                        return item;
                    });
                }
            });
            // بعد تحديث الحالة، قم بفرزها بشكل منفصل
            setlike(prevState => [...prevState].sort((a, b) => b.likeCount - a.likeCount));
        });

        //! ________________________________________________________________________________

        subscribeToChat((data) => { setcomment(data); });

        //! ________________________________________________________________________________

        subscribeToGift((data) => {
            setgift(prevState => {
                const existingIndex = prevState.findIndex(item => item.nickname === data.nickname & item.giftName === data.giftName);
                if (existingIndex === -1) {
                    // إذا كان العنصر غير موجود، قم بإضافته إلى قائمة الإعجابات
                    return [...prevState, data];
                } else {
                    // إذا كان العنصر موجودًا، قم بتحديث العدد الموجود
                    return prevState.map((item, index) => {
                        if (index === existingIndex) {
                            return { ...item, repeatCount: item.repeatCount + data.repeatCount };
                        }
                        return item;
                    });
                }
            });
            setgift(prevState => [...prevState].sort((a, b) => b.repeatCount - a.repeatCount));
        });

    }, []);


    return (
        <div>

            {/*<input type="text" value={usernmae} onChange={handleChange} />*/}
            {/*<button type="submit" onClick={start()}>START</button>*/}

            <Draggable>
                <div>
                    <div className='animated-background p-1 rounded-3 text-center '> TOP 5 Like </div>
                    <div className='container ' style={{ maxHeight: "485px", overflow: "hidden", width: "450px" }} >
                        {like.map((item, index) => (
                            <div key={index} className='row bg-light  mt-2 p-1  rounded-3 '>
                                <div className='col-md-2 '>
                                    <Image src={item.profilePictureUrl} width="50" height="50" className='rounded-circle' alt='' />
                                </div>
                                <div className='col-md-10 '>
                                    <p>{item.nickname} </p>
                                    <p>
                                        Like Count: {item.likeCount}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Draggable>

            <Draggable>
                <div>
                    <div className='animated-background p-1 rounded-3 text-center '> Top 7 Gift </div>
                    <div className='container ' style={{ maxHeight: "470px", overflow: "auto", width: "450px" }} >
                        {gift.map((item, index) => (
                            <div key={index} className='row bg-light  mt-2 p-1  rounded-3 '>
                                <div className='col-md-2 '>
                                    <Image src={item.profilePictureUrl} width="50" height="50" className='rounded-circle' alt='' />
                                </div>
                                <div className='col-md-10'>
                                    <p>
                                        {item.nickname} |
                                        <Image src={item.giftPictureUrl} width="20" height="20" className='rounded-circle' alt='' />
                                        X {item.repeatCount}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Draggable>

            <Draggable>
                <div>
                    <div className='animated-background p-1 rounded-3 text-center '> Comment </div>
                    <div className='container scroll-container' style={{ maxHeight: "220px", overflow: "auto", width: "450px" }} >

                        <div className='row bg-light  mt-2 p-1  rounded-3 '>
                            <div className='col-md-2 '>
                                <Image src={comment.profilePictureUrl} width="50" height="50" className='rounded-circle' alt='' />
                            </div>
                            <div className='col-md-10'>
                                <p>
                                    {comment.nickname} | {comment.comment}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Draggable>

        </div>
    )
}


/*
"comment":"Ff",
"nickname":"Calledtrader",
"profilePictureUrl":"https://p16-pu-sign-useast8.tiktokcdn-us.com/tos-useast8-avt-0068-tx2/6ffc9a4c534d80d978f544eeb8714db6~c5_100x100.webp?lk3s=a5d48078&x-expires=1712570400&x-signature=Th4TZQFw6WRyAC6IkQ77gOtaUzA%3D",
*/