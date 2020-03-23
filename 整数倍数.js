const ax = (multiple, num) =>
  Array(multiple)
    .fill([...Array(num)])
    .flat().length;

console.log(ax(7, 2));
