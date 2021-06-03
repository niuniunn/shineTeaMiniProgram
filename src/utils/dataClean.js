export function handleGoodsList(goodsList) {
  goodsList.map((item, index)=>{
    goodsList[index].categoryType = 'p' + item.categoryType;
    item.productList.map((subItem, subIndex)=> {
      goodsList[index].productList[subIndex].specification = JSON.parse(subItem.specification);
    })
  });
  return goodsList;
}
