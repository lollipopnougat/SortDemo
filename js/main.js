function sleep(d) {
    for (var t = Date.now(); Date.now() - t <= d;)
        ;
}
var num = 1;
var j = num - 1;
function inpuo(inputnum, target) {
    var inp = $('#' + inputnum);
    if (inp.val() == '' || !inp.val())
        $('#' + target).text('0');
    else {
        $('#' + target).text(inp.val());
        var tmp = parseInt(inp.val());
        $('#' + target).css('height', tmp.toString() + 'px');
    }
}
var lst = new Array();
var divlst = new Array();
var divstr = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
var divsize = ['85px', '170px', '255px', '340px', '425px', '510px', '595px'];
var pp = [118, 203, 288, 373, 456, 543, 627];
function swap(lhs, rhs) {
    var tmp = lst[lhs];
    lst[lhs] = lst[rhs];
    lst[rhs] = tmp;
    var flag1 = false;
    var flag2 = false;
    divlst[lhs].animate({ top: '100px' }, { queue: true, duration: 600 })
        .animate({ left: divsize[rhs] }, { queue: true, duration: 600 })
        .animate({ top: '0px' }, { queue: true, duration: 600 });
    divlst[rhs].animate({ top: '50px' }, { queue: true, duration: 600 })
        .animate({ left: divsize[lhs] }, { queue: true, duration: 600 })
        .animate({ top: '0px' }, { queue: true, duration: 600 });
    var tt = divlst[lhs];
    divlst[lhs] = divlst[rhs];
    divlst[rhs] = tt;
}
function sort() {
    if (num == 1) {
        divlst.length = 0;
        divstr.forEach(function (el) {
            divlst.push($('#' + el));
        });
        lst.length = 0;
        document.getElementById('dataarea').childNodes.forEach(function (element) {
            var tmp = element;
            if (!isNaN(parseInt(tmp.innerText)))
                lst.push(parseInt(tmp.innerText));
        });
        divstr.forEach(function (i) {
            console.log('#i-' + i.substr(0, 2));
            $('#i-' + i.substr(0, 2)).attr('disabled', 'true');
        });
    }
    if (num < lst.length) {
        if (j >= 0) {
            if (lst[j] > lst[j + 1]) {
                swap(j, j + 1);
                j--;
            }
            else {
                num++;
                j = num - 1;
            }
        }
        else {
            num++;
            j = num - 1;
        }
        if (num != lst.length) {
            $('#point').animate({ left: pp[num].toString() + 'px' });
            $('#pointl').animate({ left: (pp[j] - 20).toString() + 'px' });
            $('#pointr').animate({ left: (pp[j + 1] - 40).toString() + 'px' });
        }
        else {
            $('#pointl').css('display', 'none');
            $('#pointr').css('display', 'none');
        }
    }
    else {
        alert('排序已完成');
    }
}
//# sourceMappingURL=main.js.map