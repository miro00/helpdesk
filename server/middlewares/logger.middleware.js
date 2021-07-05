const fs = require('fs')
const path = require('path')

module.exports = (req, res, next) => {
  const startHrTime = process.hrtime();
  res.on("finish", () => {
    const elapsedHrTime = process.hrtime(startHrTime)
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
    fs.appendFileSync(`${path.dirname(require.main.filename)}/logs/${new Intl.DateTimeFormat().format(new Date())}.log`,
    `${new Intl.DateTimeFormat("ru", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(new Date())} - ${req.method}:${req.baseUrl} '${elapsedTimeInMs}ms'\n`
    )
  })
  next()
}
