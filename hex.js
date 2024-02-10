function modPow (b, e, m) {
  if (!e) return 1n
  b = b % m
  let y = 1n
  while (true) {
    if (e & 1n) y = (y * b) % m
    e >>= 1n
    if (!e) return y
    b = (b * b) % m
  }
}

function S (j, n, d, mask) {
  const shift = d << 2n
  let left = 0n
  for (let k = 0n; k <= n; k++) {
    const r = k * 8n + j
    left = (left + (modPow(16n, n - k, r) << shift) / r) & mask
  }
  let right = 0n
  for (let k = n + 1n; ; k++) {
    const rnew = right + 16n ** (d + n - k) / (k * 8n + j)
    if (right === rnew) break
    right = rnew
  }
  return left + right
}

function computePi (dd, nn) {
  const n = BigInt(nn)
  const d = BigInt(dd) - 1n
  const mask = 16n ** n - 1n
  return (
    4n * S(1n, d, n, mask) -
    2n * S(4n, d, n, mask) -
    S(5n, d, n, mask) -
    S(6n, d, n, mask)
  ) & mask
};

let i = 0n

const searchArrayStr = [
  'kf',
  'kfb',
  'ricp',
  'kf106',
  'keir',
  'orthoverse'
]

const searchArrayHex = []

for (const el in searchArrayStr) {
  console.log(searchArrayStr[el])
  searchArrayHex.push(
    encodeURIComponent(searchArrayStr[el]).split('').map((ch) => ch.codePointAt(0).toString(16).padStart(2, '0')).join('')
  )
}

console.log(searchArrayHex)

const longest = BigInt(Math.max(...(searchArrayHex.map(el => el.length))))

console.log(longest)

let j = 0

for (;;) {
  const currentFrame = computePi(i, 128).toString(16).slice(0, 64)
  for (let k = 0; k < searchArrayHex.length; k++) {
    const frameIndex = currentFrame.indexOf(searchArrayHex[k])
    if (frameIndex !== -1) {
      console.log('\nFound hex representation of ' +
        searchArrayStr[k] + ' at position ' +
        (i + BigInt(frameIndex)).toString()
      )
    }
  }
  i = i + 100n - longest
  j = j + 1
  if (j / 100 === Math.floor(j / 100)) {
    process.stdout.write('.')
  }
  if (j / 1000 === Math.floor(j / 1000)) {
    process.stdout.write('x')
  }
}
