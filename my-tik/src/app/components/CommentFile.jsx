'use client'
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Draggable from 'react-draggable';

export default function Commentfile({ content }) {
    const divRef = useRef(null);

    useEffect(() => {
        // التمرير إلى نهاية الـ <div> عندما يتغير المحتوى
        divRef.current.scrollTop = divRef.current.scrollHeight;
    }, [content]);

    return (
        <Draggable>
            <div>
                <div className='animated-background p-1 rounded-3 text-center '> Comment </div>
                <div className='container w-100' ref={divRef} style={{ maxHeight: "130px", overflow: "hidden" }} >
                    
                        <div className='row bg-light  mt-2 p-1  rounded-3 '>
                            <div className='col-md-2 '>
                                <Image src={content.profilePictureUrl} width="50" height="50" className='rounded-circle' alt='' />
                            </div>
                            <div className='col-md-10'>
                                <p>
                                    {content.nickname} | {content.comment}
                                </p>
                            </div>
                        </div>
                    
                </div>
            </div>
        </Draggable>
    );
}