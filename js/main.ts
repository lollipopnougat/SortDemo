// 单步排序接口 设计模式: 策略模式
interface Sorter {
    sort(): void;
    isFinished(): boolean;
    getNumsList(): Array<number>;
}


// 视图控制类
class ViewControl {

    private numsList: Array<number>;
    private divList: Array<JQuery<HTMLElement>>;
    private divIdName = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
    private divWidthCoord = ['9vw', '18vw', '27vw', '36vw', '45vw', '54vw', '63vw'];
    private pointerCoord = [12, 21, 30, 39, 48, 57, 66];

    public constructor() {
        this.numsList = new Array<number>();
        this.divList = new Array<JQuery<HTMLElement>>();
    }

    // 准备数据
    public prepareData() {
        this.divIdName.forEach(element => {
            this.divList.push($('#' + element));
            $('#i-' + element.substr(0, 2)).attr('disabled', 'true');
        });
        this.divList.forEach(element => {
            if (isNaN(parseInt(element.text()))) {
                throw new TypeError('非法类型!');
            }
            this.numsList.push(parseInt(element.text()));
        });
        /*
        document.getElementById('dataarea').childNodes.forEach(element => {
            let tmp = <HTMLElement>element;
            if (isNaN(parseInt(tmp.innerText))) {
                throw new TypeError('非法类型!');
            }
            this.numsList.push(parseInt(tmp.innerText));
        });*/

    }
    public getNumsList() {
        return this.numsList;
    }

    public swapDiv(lhs: number, rhs: number) {
        this.divList[lhs].animate({ top: '100px' }, { queue: true, duration: 600 })
            .animate({ left: this.divWidthCoord[rhs] }, { queue: true, duration: 600 })
            .animate({ top: '0px' }, { queue: true, duration: 600 });
        this.divList[rhs].animate({ top: '50px' }, { queue: true, duration: 600 })
            .animate({ left: this.divWidthCoord[lhs] }, { queue: true, duration: 600 })
            .animate({ top: '0px' }, { queue: true, duration: 600 });
        let tt = this.divList[lhs];
        this.divList[lhs] = this.divList[rhs];
        this.divList[rhs] = tt;
    }

    public movePointer(currentNum: number, lastNum: number) {
        if (currentNum >= this.numsList.length) {
            $('#pointl').css('display', 'none');
            $('#pointr').css('display', 'none');
            $('#point').css('color', '#48ad59');
        }
        else {
            $('#point').animate({ left: this.pointerCoord[currentNum].toString() + 'vw' });
            $('#pointl').animate({ left: (this.pointerCoord[lastNum] - 2.5).toString() + 'vw' });
            $('#pointr').animate({ left: (this.pointerCoord[lastNum + 1] - 4.5).toString() + 'vw' });
        }

    }

}

// 直插法
class InertSort implements Sorter {
    private currentNum: number;
    private lastNum: number;
    private numsList: Array<number>;
    private isSorted: boolean = false;
    private isFirstRun = true;
    private viewController = new ViewControl();

    public constructor() {
        this.currentNum = 1;
        this.lastNum = 0;
    }

    public sort(): void {
        if (this.isFirstRun) {
            this.viewController.prepareData();
            this.numsList = this.viewController.getNumsList();
            this.isFirstRun = false;
        }
        if (this.currentNum < this.numsList.length) {
            if (this.lastNum >= 0) {
                if (this.numsList[this.lastNum] > this.numsList[this.lastNum + 1]) {
                    this.swap(this.lastNum, this.lastNum + 1);
                    this.viewController.swapDiv(this.lastNum, this.lastNum + 1);
                    this.lastNum--;
                }
                else {
                    this.currentNum++;
                    this.lastNum = this.currentNum - 1;
                }
            }
            else {
                this.currentNum++;
                this.lastNum = this.currentNum - 1;
            }
            this.viewController.movePointer(this.currentNum, this.lastNum);
        }
        else {
            this.isSorted = true;

            alert('排序完成');
        }
    }

    public getNumsList(): Array<number> {
        return this.numsList;
    }

    public isFinished(): boolean {
        return this.isSorted;
    }

    public getCurrentNum(): number {
        return this.currentNum;
    }

    public getLastNum(): number {
        return this.lastNum;
    }

    private swap(lhs: number, rhs: number): void {
        let tmp = this.numsList[lhs];
        this.numsList[lhs] = this.numsList[rhs];
        this.numsList[rhs] = tmp;
    }
}




/*
function sleep(d: number) {
    for (var t = Date.now(); Date.now() - t <= d;);
}

let num = 1;
let j = num - 1;
*/
function inpuo(inputnum: string, target: string) {
    let inp = $('#' + inputnum);
    if (inp.val() == '' || !inp.val()) $('#' + target).text('0');
    else {
        $('#' + target).text(<string>inp.val());
        let tmp = parseInt(<string>inp.val());
        $('#' + target).css('height', tmp.toString() + 'px');
    }
}

let sorter = new InertSort();

function sort() {
    sorter.sort();
}
/*
let lst = new Array<number>();
let divlst = new Array<JQuery<HTMLElement>>();
let divstr = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
let divsize = ['85px', '170px', '255px', '340px', '425px', '510px', '595px'];
let pp = [118, 203, 288, 373, 456, 543, 627];


function swap(lhs: number, rhs: number) {
    let tmp = lst[lhs];
    lst[lhs] = lst[rhs];
    lst[rhs] = tmp;
    divlst[lhs].animate({ top: '100px' }, { queue: true, duration: 600 })
        .animate({ left: divsize[rhs] }, { queue: true, duration: 600 })
        .animate({ top: '0px' }, { queue: true, duration: 600 });
    divlst[rhs].animate({ top: '50px' }, { queue: true, duration: 600 })
        .animate({ left: divsize[lhs] }, { queue: true, duration: 600 })
        .animate({ top: '0px' }, { queue: true, duration: 600 });
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
    //lst.forEach(el => { console.log(el); });
}
*/