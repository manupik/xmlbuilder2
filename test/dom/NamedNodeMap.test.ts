import $$ from '../TestHelpers'

describe('NamedNodeMap', function () {

  const doc = $$.dom.createDocument('myns', 'root')
  const ele = doc.createElement('tagged')
  if (doc.documentElement) {
    doc.documentElement.appendChild(ele)
    ele.setAttribute('att', 'val')
    ele.setAttributeNS('myns', 'd:att2', 'val2')
  }
  const list = ele.attributes

  test('length', function () {
    expect(list.length).toBe(2)
  })

  test('item()', function () {
    const attr1 = list.item(0)
    expect(attr1).not.toBeNull()
    if (attr1) {
      expect(attr1.name).toBe('att')
      expect(attr1.value).toBe('val')
    }
    const attr2 = list.item(1)
    expect(attr2).not.toBeNull()
    if (attr2) {
      expect(attr2.name).toBe('d:att2')
      expect(attr2.value).toBe('val2')
    }
  })

  test('getNamedItem()', function () {
    let attr = list.getNamedItem('att')
    expect(attr).not.toBeNull()
    if (attr) {
      expect(attr.value).toBe('val')
    }
  })

  test('getNamedItemNS()', function () {
    let attr = list.getNamedItemNS('myns', 'att2')
    expect(attr).not.toBeNull()
    if (attr) {
      expect(attr.value).toBe('val2')
    }
  })

  test('setNamedItem()', function () {
    let attr = doc.createAttribute('att')
    attr.value = 'newval'
    let oldattr = list.setNamedItem(attr)
    expect(oldattr).not.toBeNull()
    if (oldattr) {
      expect(oldattr.value).toBe('val')
    }
    let newattr = list.getNamedItem('att')
    expect(newattr).not.toBeNull()
    if (newattr) {
      expect(newattr.value).toBe('newval')
    }
  })

  test('setNamedItemNS()', function () {
    let attr = doc.createAttributeNS('myns', 'd:att2')
    attr.value = 'newval'
    let oldattr = list.setNamedItemNS(attr)
    expect(oldattr).not.toBeNull()
    if (oldattr) {
      expect(oldattr.value).toBe('val2')
    }
    let newattr = list.getNamedItemNS('myns', 'att2')
    expect(newattr).not.toBeNull()
    if (newattr) {
      expect(newattr.value).toBe('newval')
    }
  })

  test('removeNamedItem()', function () {
    let oldattr = list.removeNamedItem('att')
    expect(oldattr).not.toBeNull()
    if (oldattr) {
      expect(oldattr.value).toBe('newval')
    }
    expect(list.getNamedItem('att')).toBeNull()
  })

  test('removeNamedItemNS()', function () {
    let oldattr = list.removeNamedItemNS('myns', 'att2')
    expect(oldattr).not.toBeNull()
    if (oldattr) {
      expect(oldattr.value).toBe('newval')
    }
    expect(list.getNamedItemNS('myns', 'att2')).toBeNull()
  })

  test('iteration', function () {
    ele.setAttribute('att', 'val')
    ele.setAttributeNS('myns', 'd:att2', 'val2')
    
    let names = ''
    let values  = ''
    for (const ele of list) {
      names += '_' + ele.name
      values += '_' + ele.value
    }
    expect(names).toBe('_att_d:att2')
    expect(values).toBe('_val_val2')
  })

})