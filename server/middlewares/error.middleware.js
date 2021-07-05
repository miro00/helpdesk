const fs = require('fs')
const path = require('path')

module.exports = (err, req, res, next) => {
  fs.appendFileSync(`${path.dirname(require.main.filename)}/logs/${new Intl.DateTimeFormat().format(new Date())}.log`,
  `${new Intl.DateTimeFormat("ru", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(new Date())} - ${err}\n`
  )
  res.send(err)
}
