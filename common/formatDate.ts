function formatDate(date: string) {
  var myDate = new Date(date).toJSON();
  return new Date(+new Date(myDate) + 8 * 3600 * 1000)
    .toISOString()
    .replace(/T/g, ' ')
    .replace(/\.[\d]{3}Z/, '');
}

export default formatDate;
