module.exports = function (sch) {
  var noComments = function (line) {
    var i = line.indexOf('//')
    return i > -1 ? line.slice(0, i) : line
  }
  var spaceCommentAsDescription = function (line) {
    var i = line.indexOf('//-')
    if (i <= -1) {
        return noComments(line);
    } else {
        return [line.slice(i)];
    }
  }
  var getSpaceCommentAsSingleToken = function(total, arr_or_string) {
    return total.concat(arr_or_string)
    /*
    if (typeof(arr_or_string) == "string") {
      return arr_or_string;
    } else {
      return arr_or_string[0];
    }
    */
  }
  var trimWithArr = function(arr_or_string) {
    if (typeof(arr_or_string) === "string") {
      return trim(arr_or_string);
    } else {
      return arr_or_string;
    }
  }

  var noMultilineComments = function () {
    var inside = false
    return function (token) {
      if (token === '/*') {
        inside = true
        return false
      }
      if (token === '*/') {
        inside = false
        return false
      }
      return !inside
    }
  }
  var splitExceptComment = function (arr_or_string) {
    if (typeof(arr_or_string) === "string") {
      return arr_or_string.split(/\s+|\n+/gm)
    } else {
      return arr_or_string
    }
  }

  var trim = function (line) {
    return line.trim()
  }

  var sch_space_comment_as_description_arr = sch
    .replace(/([;,{}\(\)=\:\[\]<>]|\/\*|\*\/)/g, ' $1 ')
    .split(/\n/)
    .map(trim)
    .filter(Boolean)
    .map(spaceCommentAsDescription)
    .map(trimWithArr)
    .filter(Boolean)
    .map(splitExceptComment)
    .filter(Boolean)
    .reduce(getSpaceCommentAsSingleToken)
    .filter(noMultilineComments())
  return sch_space_comment_as_description_arr
}
