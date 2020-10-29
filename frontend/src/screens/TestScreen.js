import React from 'react'
import { Image } from 'react-bootstrap'

const TestScreen = () => {
  const cellColNum = 10
  const cellRowNum = 10
  const cellTotal = cellColNum * cellRowNum
  const colorSpace = 256 * 256 * 256
  const colorStep = colorSpace / cellTotal

  const MAX_RND_RANGE = 120
  const MAX_RND_RANGE_half = MAX_RND_RANGE / 2

  // const key_R = Math.floor(Math.random() * 256)
  // const key_G = Math.floor(Math.random() * 256)
  // const key_B = Math.floor(Math.random() * 256)

  const key_R = 158
  const key_G = 188
  const key_B = 220

  const keyColor = '#' + key_R + key_G + key_B

  return (
    <>
      <h1>
        key: {key_R}, {key_G}, {key_B}
      </h1>
      <div
        style={{
          display: 'grid',
          'grid-gap': '4px 4px',
          'grid-template-columns': `repeat(${cellColNum}, 200px)`,
          'grid-template-rows': 'repeat(3, 200px)',
          'grid-auto-rows': '200px',
          'justify-content': 'center',
        }}
      >
        {[...Array(cellTotal).keys()].map((index) => {
          // Random: Absolute
          const rand_R = Math.random() * MAX_RND_RANGE - MAX_RND_RANGE_half
          const rand_G = Math.random() * MAX_RND_RANGE - MAX_RND_RANGE_half
          const rand_B = Math.random() * MAX_RND_RANGE - MAX_RND_RANGE_half

          // Random: As percentage
          // const rand_R =
          //   (key_R * (Math.random() * MAX_RND_RANGE - MAX_RND_RANGE_half)) / 100
          // const rand_G =
          //   (key_G * (Math.random() * MAX_RND_RANGE - MAX_RND_RANGE_half)) / 100
          // const rand_B =
          //   (key_B * (Math.random() * MAX_RND_RANGE - MAX_RND_RANGE_half)) / 100

          let combine_R = key_R + rand_R
          let combine_G = key_G + rand_G
          let combine_B = key_B + rand_B

          combine_R = Math.floor(Math.max(0, Math.min(255, combine_R)))
          combine_G = Math.floor(Math.max(0, Math.min(255, combine_G)))
          combine_B = Math.floor(Math.max(0, Math.min(255, combine_B)))

          const finalColor =
            '#' +
            Number(combine_R).toString(16).padStart(2, '0') +
            Number(combine_G).toString(16).padStart(2, '0') +
            Number(combine_B).toString(16).padStart(2, '0')

          const randColor =
            '#' +
            `${Number(Math.floor(Math.random() * colorSpace)).toString(
              16
            )}`.padStart(6, '0')

          return (
            <div
              title={finalColor}
              style={{
                backgroundColor: `${finalColor}`,
                transform: `rotate(${Math.floor(
                  Math.random() * 15
                )}deg) scale(${1 - Math.random() * 0.5})`,
                // transform: `scale(${1 - Math.random() * 0.5})`,
                // transform: `rotateX(${Math.floor(Math.random() * 45)}deg)`,
                // border: 'solid 1px black',
              }}
            >
              {/* {index} */}
              <Image
                src='/images/airpods.jpg'
                alt=''
                fluid
                className='p-3 m-2'
              />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default TestScreen
