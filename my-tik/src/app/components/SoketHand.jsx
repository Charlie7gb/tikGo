'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.css';
import Draggable from 'react-draggable';
import './Style.css';

export default function SoketHand() {

    const [like, setlike] = useState([]);
    const [gift, setgift] = useState([]);

    useEffect(() => {
        // الاتصال بالخادم Socket.IO
        const socket = io('http://localhost:8081'); // ضع مكان الرابط الفعلي للخادم
        //ارسل
        socket.emit('setUniqueId', "@aboahmad_003", "like");
        // استمع لرد الخادم إذا كنت بحاجة لذلك
        socket.on('like', (data) => {
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
            //console.log('Server responded roomUser :', data);
        });

        socket.on('gift', (data) => {
            setgift(prevState => [...prevState, data]);
            console.log(data);
        });



        // عند تفكيك المكون أو المغادرة
        return () => {
            socket.disconnect(); // فصل الاتصال عند تفكيك المكون
        };
    }, []);



    const isNameExists = (name) => { // تعريف دالة للتحقق مما إذا كان الاسم موجودًا في القائمة
        return like.some(item => item.nickname === name);
    };

    return (
        <div>

            <Draggable>
                <div>
                    <div className='animated-background p-1 rounded-3 '>LIKE</div>
                    <div className='container ' style={{ maxHeight: "300px", overflow: "auto", maxWidth: "450px" }} >
                        {like.map((item, index) => (
                            <div key={index} className='row bg-light  mt-2 p-1  rounded-3 '>
                                <div className='col-md-3 '>
                                    <Image src={item.profilePictureUrl} width="100" height="100" className='rounded-circle' alt='' />
                                </div>
                                <div className='col-md-9 '>
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
                    <div className='animated-background p-1 rounded-3 '>GIFT</div>
                    <div className='container ' style={{ maxHeight: "300px", overflow: "auto", maxWidth: "450px" }} >
                        {gift.map((item, index) => (
                            <div key={index} className='row bg-light  mt-2 p-1  rounded-3 '>
                                <div className='col-md-3 '>
                                    <Image src={item.profilePictureUrl} width="100" height="100" className='rounded-circle' alt='' />
                                </div>
                                <div className='col-md-9'>
                                    <p>
                                        {item.nickname} | 
                                        <Image src={item.giftPictureUrl} width="20" height="20" className='rounded-circle' alt='' />
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Draggable>

        </div>
    )
}


/*

Server responded roomUser : 
Object {
     likeCount: 2, 
     totalLikeCount: 7555, 
     userId: "7141865141071643650", 
     secUid: "MS4wLjABAAAAO0mMcqYOtbmnSUBN1Lc98Ix-2j8jWtwfLc_ub_qhCl3Zl0HJ4ufzg5j87BT-MXlG", 
     uniqueId: "drifesaliha", 
     nickname: "drifesaliha", 
     profilePictureUrl: "https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/7141865249145094145.webp?lk3s=a5d48078&x-expires=1712408400&x-signature=mtEwJdHQYMxT5LL1Kbuy2PrZ4xE%3D", followRole: 0, userBadges: [], userSceneTypes: [], … }

createTime: "1712236278726"​
displayType: "pm_mt_msg_viewer"
followInfo: Object { followingCount: 361, followerCount: 55, followStatus: 0, … }​
followRole: 0
gifterLevel: 0
isModerator: false
isNewGifter: false
isSubscriber: false
label: "{0:user} liked the LIVE"
​
likeCount: 2
​
msgId: "7353998815160568581"
​
nickname: "drifesaliha"
​
profilePictureUrl: "https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/7141865249145094145.webp?lk3s=a5d48078&x-expires=1712408400&x-signature=mtEwJdHQYMxT5LL1Kbuy2PrZ4xE%3D"
​
secUid: "MS4wLjABAAAAO0mMcqYOtbmnSUBN1Lc98Ix-2j8jWtwfLc_ub_qhCl3Zl0HJ4ufzg5j87BT-MXlG"
​
teamMemberLevel: 0
​
topGifterRank: null
​
totalLikeCount: 7555
​
uniqueId: "drifesaliha"
​
userBadges: Array []
​
userDetails: Object { createTime: "0", bioDescription: "", profilePictureUrls: (3) […] }
​
userId: "7141865141071643650"
​
userSceneTypes: Array []
​
<prototype>: Object { … }
SoketHand.jsx:18:20


*/

/*

Object { giftId: 5655, repeatCount: 1, groupId: "1712253687440", userId: "116466395495759872", secUid: "MS4wLjABAAAAsPBn7UiAo9h4qfFGRbu6EuZL7vN9sKqowSNOXQwlCWoRnFJtiwv_ckn5scoCRpLn", uniqueId: "j00ud", nickname: "joud", profilePictureUrl: "https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/1594805258216454~c5_100x100.webp?lk3s=a5d48078&x-expires=1712426400&x-signature=yFP10FTgU2m1tN9jcUSIhZb5FIE%3D", followRole: 0, userBadges: (1) […], … }
​
createTime: "1712253688246"
​
describe: "Sent Rose"
​
diamondCount: 1
​
displayType: "webcast_aweme_gift_send_message"
​
followInfo: Object { followingCount: 631, followerCount: 114, followStatus: 0, … }
​
followRole: 0
​
gift: Object { gift_id: 5655, repeat_count: 1, repeat_end: 0, … }
 ​
gift_id: 5655
 ​
gift_type: 1
 ​
repeat_count: 1
 ​
repeat_end: 0
 ​
<prototype>: Object { … }
​
giftId: 5655
​
giftName: "Rose"
​
giftPictureUrl: "https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.png"
​
giftType: 1
​
gifterLevel: 6
​
groupId: "1712253687440"
​
isModerator: false
​
isNewGifter: false
​
isSubscriber: false
​
label: "{0:user} sent {1:gift} {2:string}"
​
msgId: "7354073319757695751"
​
nickname: "joud"
​
profilePictureUrl: "https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/1594805258216454~c5_100x100.webp?lk3s=a5d48078&x-expires=1712426400&x-signature=yFP10FTgU2m1tN9jcUSIhZb5FIE%3D"
​
receiverUserId: "7229052476762440709"
​
repeatCount: 1
​
repeatEnd: false
​
secUid: "MS4wLjABAAAAsPBn7UiAo9h4qfFGRbu6EuZL7vN9sKqowSNOXQwlCWoRnFJtiwv_ckn5scoCRpLn"
​
teamMemberLevel: 0
​
timestamp: 1712253688246
​
topGifterRank: null
​
uniqueId: "j00ud"
​
userBadges: Array [ {…} ]
​
userDetails: Object { createTime: "0", bioDescription: "", profilePictureUrls: (3) […] }
​
userId: "116466395495759872"
​
userSceneTypes: Array [ 8 ]
​
<prototype>: Object { … }
SoketHand.jsx:38:20


*/