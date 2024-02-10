# Find a string in Pi

Install with `npm install`
Edit `dec.js` or `hex.js` to contain the string you want to search for
Run with `npx dec.js` or `nxp hex.js`

## dec.js
This Javascript code converts an ASCII string into a decimal number, then searches the digits of pi to find the index where the string representation can be found.

## hex.js
This Javascript code converts an ASCII string into a hex string, then searches the hexadecimal digits of pi to find the index where the hex string representation can be found.

## Example
You can use `npx hex.js` to determine that the string `kf`, with hexadecimal representation `0x6b66` can be found starting at the 31816th digit of pi in hexadecimal notation.

Note that every extra character you add to the search string increases the average search time by a factor of 256.
