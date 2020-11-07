const randColor = () => {
  const MAX_RND_RANGE = 120
  const MAX_RND_RANGE_half = MAX_RND_RANGE / 2

  const ANTI_WHITE_THRESHOLD = 600
  const ANTI_BLACK_THRESHOLD = 50

  const key_R = Math.floor(Math.random() * 256)
  const key_G = Math.floor(Math.random() * 256)
  const key_B = Math.floor(Math.random() * 256)

  // const key_R = 165
  // const key_G = 165
  // const key_B = 180

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

  // ----  Feature to Anti-White and Anti-Black ----

  function findMaxItem(arr) {
    let len = arr.length
    let max = -Infinity
    let index = -1

    while (len--) {
      if (arr[len] > max) {
        max = arr[len]
        index = len
      }
    }
    return { index, max }
  }

  function findMinItem(arr) {
    let len = arr.length
    let min = Infinity
    let index = -1

    while (len--) {
      if (arr[len] < min) {
        min = arr[len]
        index = len
      }
    }
    return { index, min }
  }

  const sumValue = combine_R + combine_G + combine_B
  let colorChannels = [combine_R, combine_G, combine_B]

  console.log(colorChannels)

  if (sumValue > ANTI_WHITE_THRESHOLD) {
    // reduce the min channel to below threshold
    let { index, min } = findMinItem(colorChannels)
    colorChannels[index] = min - (sumValue - ANTI_WHITE_THRESHOLD)
  } else if (sumValue < ANTI_BLACK_THRESHOLD) {
    // reduce the min channel to below threshold
    let { index, max } = findMaxItem(colorChannels)
    colorChannels[index] = max + (ANTI_BLACK_THRESHOLD - sumValue)
  }

  console.log(colorChannels)

  // Clip values to [0 - 255]
  colorChannels = colorChannels.map((val) =>
    Math.floor(Math.max(0, Math.min(255, val)))
  )

  // combine_R = Math.floor(Math.max(0, Math.min(255, combine_R)))
  // combine_G = Math.floor(Math.max(0, Math.min(255, combine_G)))
  // combine_B = Math.floor(Math.max(0, Math.min(255, combine_B)))

  console.log(colorChannels)

  const finalColor =
    '#' +
    Number(colorChannels[0]).toString(16).padStart(2, '0') +
    Number(colorChannels[1]).toString(16).padStart(2, '0') +
    Number(colorChannels[2]).toString(16).padStart(2, '0')

  console.log(finalColor)

  return finalColor
}

export default randColor
