function sleep(d: number) {
    for (var t = Date.now(); Date.now() - t <= d;);
}
// async function sleep(paramT: number) {
//     await  this.WaitFunction(setTimeout, paramT);
// }
let num = 1;
let j = num - 1;

function inpuo(inputnum: string, target: string) {
    let inp = $('#' + inputnum);
    if (inp.val() == '' || !inp.val()) $('#' + target).text('0');
    else {
        $('#' + target).text(<string>inp.val());
        let tmp = parseInt(<string>inp.val());
        $('#' + target).css('height', tmp.toString() + 'px');
    }
    /*
    let input = <HTMLInputElement>document.getElementById(inputnum);
    //console.log(input1.value);
    if (input.value == '' || !input.value) document.getElementById(target).innerText = '0';
    else {
        document.getElementById(target).innerText = input.value;
        let tmp = parseInt(input.value);
        document.getElementById(target).style.height = tmp.toString() + 'px';
    }*/
}
let lst = new Array<number>();
let divlst = new Array<JQuery<HTMLElement>>();
let divstr = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
let divsize = ['85px', '170px', '255px', '340px', '425px', '510px', '595px'];
let pp = [118, 203, 288, 373, 456, 543, 627];
// function myanimate(lhs: number, rhs: number) {
//     return new Promise(function (resolve, reject) {
//         divlst[lhs].animate({ left: divsize[rhs] }, { queue: false, complete: () => { resolve(true); }, duration: 1000 });
//     });
// }


function swap(lhs: number, rhs: number) {
    let tmp = lst[lhs];
    lst[lhs] = lst[rhs];
    lst[rhs] = tmp;
    let flag1 = false;
    let flag2 = false;
    divlst[lhs].animate({ top: '100px' }, { queue: true, duration: 600 })
        .animate({ left: divsize[rhs] }, { queue: true, duration: 600 })
        .animate({ top: '0px' }, { queue: true, duration: 600 });
    divlst[rhs].animate({ top: '50px' }, { queue: true, duration: 600 })
        .animate({ left: divsize[lhs] }, { queue: true, duration: 600 })
        .animate({ top: '0px' }, { queue: true, duration: 600 });

    // let pro = await new Promise(function (resolve, reject) {
    //     divlst[lhs].animate({ left: divsize[rhs] }, { queue: false, complete: () => { resolve(true) ; }, duration: 1000 });
    // });
    // let pro2 = await new Promise(function (resolve, reject) {
    //     divlst[rhs].animate({ left: divsize[lhs] }, { queue: false, complete: () => { resolve(true); }, duration: 1000 });
    // });
    //let pro1 = await myanimate(lhs, rhs);
    //let pro2 = await myanimate(rhs, lhs);
    //console.log(pro1);
    //console.log(pro2);
    //pro.then((data: boolean) => { flag1 = data; });
    //pro2.then((data: boolean) => { flag2 = data; });
    //while (!flag1||!flag2);
    // divlst[lhs].animate({ left: divsize[rhs] }, 1000, () => {
    //     //console.log(divlst[lhs].queue());
    //     sleep(500);
    // });
    // divlst[rhs].animate({ left: divsize[lhs] }, 1000);
    // //divlst[rhs].animate({ left: divsize[lhs] }, 1000);
    // //console.log(divlst[rhs].queue());
    // //divlst[lhs].dequeue();
    //sleep(1000);
    //divlst[lhs].css('left', divsize[rhs]);
    //divlst[rhs].css('left', divsize[lhs]);
    let tt = divlst[lhs];
    divlst[lhs] = divlst[rhs];
    divlst[rhs] = tt;
}

function sort() {
    if (num == 1) {
        divlst.length = 0;
        divstr.forEach(el => {
            divlst.push($('#' + el));
        });
        lst.length = 0;
        document.getElementById('dataarea').childNodes.forEach(element => {
            let tmp = <HTMLElement>element;
            if (!isNaN(parseInt(tmp.innerText))) lst.push(parseInt(tmp.innerText));

        });
        divstr.forEach(i => {
            console.log('#i-' + i.substr(0, 2));
            $('#i-' + i.substr(0, 2)).attr('disabled', 'true');
        });

        // lst.forEach(el => { console.log(el); });
        // divlst.forEach(el => {
        //     console.log(el);
        // });
    }

    //for (let i = num; i < lst.length; i++) {
    if (num < lst.length) {
        if (j >= 0) {
            if (lst[j] > lst[j + 1]) {
                //sleep(100);
                swap(j, j + 1);
                j--;
                //sleep(500);
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
    //lst.forEach(el => { console.log(el); });
}