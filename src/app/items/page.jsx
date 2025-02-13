import React from 'react'

export default function Page() {
    // valies 
    return (
        <div className='flex flex-col gap-[60px]'>
            <section>
                <h1>Valies</h1>
                <div className='justify-center items-center place-items-center gap-[10px] grid grid-cols-4 mx-auto w-full'>
                    {[...Array(9)].map((pro, i) => (
                        <div key={i} className='w-[160px] h-[250px]'>
                            <img src={`/images/valies/v${i + 1}.png`} alt="valies" />
                        </div>
                    ))}
                </div>
            </section>
            <section>
                <h1>Cloths</h1>
                <div className='justify-center items-center place-items-center gap-[10px] grid grid-cols-4 mx-auto w-full'>
                    {[...Array(12)].map((pro, i) => (
                        <div key={i} className='w-[160px] h-[250px]'>
                            <img src={`/images/cloths/geni${i + 1}.png`} alt="valies" />
                        </div>
                    ))}
                </div>
            </section>
            <section>
                <h1>Feeding</h1>
                <div className='justify-center items-center place-items-center gap-[10px] grid grid-cols-4 mx-auto w-full'>
                    {[...Array(12)].map((pro, i) => (
                        <div key={i} className='w-[160px] h-[250px]'>
                            <img src={`/images/feeding/feed${i + 1}.png`} alt="valies" />
                        </div>
                    ))}
                </div>
            </section>
            <section>
                <h1>Bath</h1>
                <div className='justify-center items-center place-items-center gap-[10px] grid grid-cols-4 mx-auto w-full'>
                    {[...Array(11)].map((pro, i) => (
                        <div key={i} className='w-[160px] h-[250px]'>
                            <img src={`/images/bath/bath${i + 1}.png`} alt="valies" />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
