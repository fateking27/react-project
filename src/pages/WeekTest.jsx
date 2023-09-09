import React, { useState } from 'react'

function WeekTest() {

    const [datalist, setDatalist] = useState([
        { id: 1, img: '../../public/656986a82a23f5e1fb37eb18749520b.png', },
        { id: 2, img: '../../public/ac4cf2d9e1b390308f1889e027ba029.png', },
        { id: 3, img: '../../public/c935906d31857619dfdf45e1b23f65e.png', },
        { id: 4, img: '../../public/e87d19887d6838face0d04efbb87e6f.png', },
        { id: 5, img: '../../public/ef3a3558937aaf4a0fab5baf4ca616a.png', },
    ]);

    const DrdgStart = (e, index) => {
        e.dataTransfer.setData('index', index)
        console.log('ddd', e.dataTransfer.getData('index'))
    }

    const DragOver = (e) => {
        e.preventDefault()
    }

    const Drop = (e, index) => {
        e.preventDefault()
        const oldIndex = e.dataTransfer.getData('index')
        let newDatalist = [...datalist]
        console.log('ccc', index)

        let tmp = newDatalist[index]
        newDatalist[index] = newDatalist[oldIndex]
        newDatalist[oldIndex] = tmp

        setDatalist(newDatalist)
    }

    return (
        <div>
            {
                datalist.map((item, index) => {
                    return <span
                        key={item.id}
                        draggable
                        onDragStart={(e) => { DrdgStart(e, index) }}
                        onDragOver={DragOver}
                        onDrop={(e) => Drop(e, index)}>
                        <img style={{ width: 30, marginTop: 15, padding: 5 }} src={item.img} />
                    </span>
                })
            }
        </div>
    )
}

export default WeekTest