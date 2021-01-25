export default function (x,y,z) {
  var i, j, k, A;
  var u, v, w, s, hi, lo, x, y, z, y, t, b, h, b5, b4, b3, b2, b1, p, q, r;
  var onethird = 0.333333333;
  var onesixth = 0.166666667;
  var T = [0x15, 0x38, 0x32, 0x2c, 0x0d, 0x13, 0x07, 0x2a];

  // returns a value in the range of about [-0.347 .. 0.347]
  function noise(x, y, z) {
    // Skew input space to relative coordinate in simplex cell
    s = (x + y + z) * onethird;
    i = fastfloor(x + s);
    j = fastfloor(y + s);
    k = fastfloor(z + s);

    // Unskew cell origin back to (x, y , z) space
    s = (i + j + k) * onesixth;
    u = x - i + s;
    v = y - j + s;
    w = z - k + s;

    A = [0, 0, 0];

    // For 3D case, the simplex shape is a slightly irregular tetrahedron.
    // Determine which simplex we're in
    hi = u >= w ? (u >= v ? 0 : 1) : v >= w ? 1 : 2;
    lo = u < w ? (u < v ? 0 : 1) : v < w ? 1 : 2;

    return kay(hi) + kay(3 - hi - lo) + kay(lo) + kay(0);
  }

  function fastfloor(n) {
    return Math.floor(n);
  }

  function kay(a) {
    s = (A[0] + A[1] + A[2]) * onesixth;
    x = u - A[0] + s;
    y = v - A[1] + s;
    z = w - A[2] + s;
    t = 0.6 - x * x - y * y - z * z;
    h = shuffle(i + A[0], j + A[1], k + A[2]);
    A[a]++;
    if (t < 0) return 0;
    b5 = (h >> 5) & 1;
    b4 = (h >> 4) & 1;
    b3 = (h >> 3) & 1;
    b2 = (h >> 2) & 1;
    b = h & 3;
    p = b == 1 ? x : b == 2 ? y : z;
    q = b == 1 ? y : b == 2 ? z : x;
    r = b == 1 ? z : b == 2 ? x : y;
    p = b5 == b3 ? -p : p;
    q = b5 == b4 ? -q : q;
    r = b5 != (b4 ^ b3) ? -r : r;
    t *= t;
    return 8 * t * t * (p + (b == 0 ? q + r : b2 == 0 ? q : r));
  }

  function shuffle(i, j, k) {
    return (
      bee(i, j, k, 0) +
      bee(j, k, i, 1) +
      bee(k, i, j, 2) +
      bee(i, j, k, 3) +
      bee(j, k, i, 4) +
      bee(k, i, j, 5) +
      bee(i, j, k, 6) +
      bee(j, k, i, 7)
    );
  }

  function bee(i, j, k, B) {
    if (arguments.length == 2) return bee2(i, j);
    return T[(bee(i, B) << 2) | (bee(j, B) << 1) | bee(k, B)];
  }

  function bee2(N, B) {
    return (N >> B) & 1;
  }
  return noise(x, y, z);
}
