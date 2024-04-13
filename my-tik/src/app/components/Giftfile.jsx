'use client'
import { useEffect } from 'react';
import Image from 'next/image';
import Draggable from 'react-draggable';

export default function Giftfile({ content }) {

    return (
       <Draggable>
            <div>
                <div className='animated-background p-1 rounded-3 text-center '> Top Gift </div>
					<div className='container w-100' style={{ maxHeight: "333px", overflow: "hidden" }} >
                    {content.map((item, index) => (
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
    );
}