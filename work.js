// the string to search for
const searchString = 'me'

const uriSafe = encodeURIComponent(searchString)

// convert it into a hexadecimal string
const chars = uriSafe.split('')
const hexChars = chars.map((ch) =>
  ch.codePointAt(0).toString(16).padStart(2, '0')
)
const hexNumber = hexChars.join('')

const decNumber = BigInt(`0x${hexNumber}`)

// decNumber is a decimal that represents our string

// split our number into an array for digit matching
const decArray = decNumber.toString().split('')
console.log(decArray)

let q = 1n; let r = 180n; let t = 60n; let i = 2n
// candidate will track how many digits we have matched
let candidate = 0

for (;;) {
  const y = (q * (27n * i - 12n) + 5n * r) / (5n * t)
  const u = 3n * (3n * i + 1n) * (3n * i + 2n)
  r = 10n * u * (q * (5n * i - 2n) + r - y * t)
  q = 10n * q * i * (2n * i - 1n)
  t = t * u
  i = i + 1n

  if (decArray[candidate] === y.toString()) {
    candidate++
    if (candidate === decArray.length) {
      console.log('\n' + searchString + ' is found at ' + (i - 1n) + ' position.')
      break
    }
  } else if (candidate !== 0) {
    if (candidate === (decArray.length - 1)) console.log('Close 😔')
    candidate = 0
  }
}
