// 单步排序接口 设计模式: 策略模式
interface Sorter {
    sort(): void;
    isFinished(): boolean;
    getNumsList(): Array<number>;
}

enum SortType {
    InsertSort,
    ShellSort,
    SelectSort,
    BubbleSort,
    QuickSort,
    HeapSort,
    MergeSort
}

// 视图控制类
class ViewControl {

    private static divIdName = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
    private static divWidthCoord = ['9vw', '18vw', '27vw', '36vw', '45vw', '54vw', '63vw'];
    private static pointerCoord = [8, 17, 26, 35, 44, 53, 62];
    private static pointerWidth = [12.25, 21.25, 30.25, 39.25, 48.25, 57.25, 66.25, 75.25];
    private numsList: Array<number>;
    private divList: Array<JQuery<HTMLElement>>;
    private titleList: Array<JQuery<HTMLElement>>;
    private sortType: SortType;

    public constructor(sortType: SortType) {
        this.numsList = new Array<number>();
        this.divList = new Array<JQuery<HTMLElement>>();
        this.sortType = sortType;
        this.titleList = new Array<JQuery<HTMLElement>>();
        // let titleId = ['inS', 'shS', 'seS', 'buS', 'quS', 'heS', 'meS'];
        // titleId.forEach(element => {
        //     this.titleList.push($('#' + element));
        // });
    }

    // private setSortType(): void {
    //     for (let i = 0; i < this.titleList.length; i++) {
    //         if (i == <number>this.sortType) {
    //             continue;
    //         }
    //         else {
    //             this.titleList[i].css('display', 'none');
    //         }
    //     }
    // }

    // 准备数据
    public prepareData(): void {
        ViewControl.divIdName.forEach(element => {
            this.divList.push($('#' + element));
            $('#i-' + element.substr(0, 2)).attr('disabled', 'true');
        });
        //this.setSortType();

        $('#inS').css('display', 'none');
        $('#seS').css('display', 'none');
        $('#buS').css('display', 'none');
        $('#shS').css('display', 'none');
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
    public getNumsList(): Array<number> {
        return this.numsList;
    }

    public swapDiv(lhs: number, rhs: number): void {
        this.divList[lhs].animate({ top: '100px' }, { queue: true, duration: 600 })
            .animate({ left: ViewControl.divWidthCoord[rhs] }, { queue: true, duration: 600 })
            .animate({ top: '0px' }, { queue: true, duration: 600 });
        this.divList[rhs].animate({ top: '50px' }, { queue: true, duration: 600 })
            .animate({ left: ViewControl.divWidthCoord[lhs] }, { queue: true, duration: 600 })
            .animate({ top: '0px' }, { queue: true, duration: 600 });
        let tt = this.divList[lhs];
        this.divList[lhs] = this.divList[rhs];
        this.divList[rhs] = tt;
    }

    public movePointer(currentNum: number, leftPoint: number, rightPoint: number, isFine: boolean): void {
        if (isFine) {
            $('#pointl').css('color', '#fff');
            $('#pointr').css('color', '#fff');
            $('#point').css('color', '#48ad59');
        } else {
            $('#point').animate({ left: ViewControl.pointerCoord[currentNum].toString() + 'vw' });
            $('#pointl').animate({ left: ViewControl.pointerWidth[leftPoint].toString() + 'vw' });
            $('#pointr').animate({ left: (ViewControl.pointerWidth[rightPoint] - 2).toString() + 'vw' });
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
    private viewController = new ViewControl(SortType.InsertSort);

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
            if (this.lastNum < 0) {
                this.viewController.movePointer(this.currentNum, this.lastNum + 1, this.lastNum + 1, (this.currentNum >= this.numsList.length));
            }
            else {
                this.viewController.movePointer(this.currentNum, this.lastNum, this.lastNum + 1, (this.currentNum >= this.numsList.length));
            }
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


//希尔排序 
class ShellSort implements Sorter {
    private currentNum: number;
    private lastNum: number;
    private gap: number;
    private tmp: number;
    private numsList: Array<number>;
    private isSorted: boolean = false;
    private isFirstRun = true;
    private controlFlag1 = true;
    private viewController = new ViewControl(SortType.ShellSort);

    public constructor() {
        this.currentNum = 1;
        this.lastNum = 0;
    }
    public sort(): void {
        if (this.isFirstRun) {
            this.viewController.prepareData();
            this.numsList = this.viewController.getNumsList();
            this.gap = Math.floor(this.numsList.length / 2);
            this.currentNum = this.gap;
            this.isFirstRun = false;
        }
        if (this.gap >= 1) {
            if (this.currentNum < this.numsList.length) {
                //for (let i = gap; i < this.numsList.length; i++) {
                if (this.controlFlag1) {
                    this.tmp = this.numsList[this.currentNum];
                    this.lastNum = this.currentNum - this.gap;
                    this.viewController.movePointer(this.gap, this.currentNum, this.lastNum, (this.gap < 1));
                    this.controlFlag1 = false;
                }
                else {
                    this.viewController.movePointer(this.gap, this.currentNum, this.lastNum, (this.gap < 1));
                }
                //直接插入排序，会向前找所适合的位置
                if (this.lastNum >= 0 && this.numsList[this.lastNum] > this.tmp) {
                    //交换位置
                    //this.viewController.movePointer(this.gap, this.currentNum, this.lastNum, (this.gap < 1));
                    this.swap(this.lastNum + this.gap, this.lastNum);
                    //this.numsList[this.lastNum + gap] = this.numsList[this.lastNum];
                    this.viewController.swapDiv(this.lastNum + this.gap, this.lastNum);
                    //this.viewController.movePointer(this.gap, this.currentNum, this.lastNum, (this.gap < 1));
                    this.lastNum = this.lastNum - this.gap;
                }
                else {
                    this.currentNum++;
                    this.lastNum = this.currentNum - this.gap;
                    this.viewController.movePointer(this.gap, this.currentNum, this.lastNum, (this.gap < 1));
                    this.controlFlag1 = true;
                }
                //this.numsList[this.lastNum + gap] = tmp;
            }
            else {
                this.gap = Math.floor(this.gap / 2);
                this.currentNum = this.gap;
                this.viewController.movePointer(this.gap, this.currentNum, this.lastNum, (this.gap < 1));
            }
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

// 简单选择
class SelectSort implements Sorter {
    private currentNum: number;
    private currentMaxIndex: number;
    private maxNums: number;
    private numsList: Array<number>;
    private isSorted: boolean = false;
    private isFirstRun = true;
    private viewController = new ViewControl(SortType.SelectSort);

    public constructor() {
        this.currentNum = 1;
        this.maxNums = 0;
        this.currentMaxIndex = 0;
    }

    public sort(): void {
        if (this.isFirstRun) {
            this.viewController.prepareData();
            this.numsList = this.viewController.getNumsList();
            this.isFirstRun = false;
        }
        if (this.currentNum < this.numsList.length - this.maxNums) {
            if (this.numsList[this.currentNum] > this.numsList[this.currentMaxIndex]) {
                this.currentMaxIndex = this.currentNum;
            }
            if (this.currentNum == this.numsList.length - this.maxNums - 1) {
                this.swap(this.numsList.length - this.maxNums - 1, this.currentMaxIndex);
                this.viewController.swapDiv(this.numsList.length - this.maxNums - 1, this.currentMaxIndex);
                this.currentNum = 1;
                this.currentMaxIndex = 0;
                this.maxNums++;
            }
            else {
                this.currentNum++;
            }
            this.viewController.movePointer(this.numsList.length - this.maxNums - 1, this.currentNum, this.currentMaxIndex, (this.maxNums == this.numsList.length - 1));
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

    public getmaxNums(): number {
        return this.maxNums;
    }

    private swap(lhs: number, rhs: number): void {
        let tmp = this.numsList[lhs];
        this.numsList[lhs] = this.numsList[rhs];
        this.numsList[rhs] = tmp;
    }
}

// 起泡排序
class BubbleSort implements Sorter {
    private currentNum: number;
    private recNums: number;
    private numsList: Array<number>;
    private isSorted: boolean = false;
    private isFirstRun = true;
    private viewController = new ViewControl(SortType.BubbleSort);

    public constructor() {
        this.currentNum = 1;
        this.recNums = 0;
    }

    public sort(): void {
        if (this.isFirstRun) {
            this.viewController.prepareData();
            this.numsList = this.viewController.getNumsList();
            this.isFirstRun = false;
        }
        if (this.currentNum < this.numsList.length - this.recNums) {
            if (this.numsList[this.currentNum - 1] > this.numsList[this.currentNum]) {
                this.swap(this.currentNum, this.currentNum - 1);
                this.viewController.swapDiv(this.currentNum, this.currentNum - 1);
            }
            if (this.currentNum == this.numsList.length - this.recNums - 1) {
                this.recNums++;
                this.currentNum = 1;
            }
            else {
                this.currentNum++;
            }
            this.viewController.movePointer(this.numsList.length - this.recNums - 1, this.currentNum, this.currentNum - 1, (this.recNums == this.numsList.length - 1));
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

    public getrecNums(): number {
        return this.recNums;
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
function inpuo(inputnum: string, target: string): void {
    let inp = $('#' + inputnum);
    if (inp.val() == '' || !inp.val()) $('#' + target).text('0');
    else {
        $('#' + target).text(<string>inp.val());
        let tmp = parseInt(<string>inp.val());
        $('#' + target).css('height', tmp.toString() + 'px');
    }
}

let sorter: Sorter = new InertSort();

function radioChange(): void {
    if ($('#inS').prop('checked')) {
        sorter = new InertSort();
        $('#desc1').text('蓝色箭头代表此轮要插入有序列表的数');
        $('#pointr').css('left', '19vw');
        $('#pointl').css('left', '12.25vw');
        $('#point').css('left', '17vw');
    }
    else if ($('#seS').prop('checked')) {
        sorter = new SelectSort();
        $('#desc1').text('蓝色箭头代表当前找到的最大数');
        $('#pointr').css('left', '10.25vw');
        $('#pointl').css('left', '21.25vw');
        $('#point').css('left', '62vw');
    }
    else if ($('#buS').prop('checked')) {
        sorter = new BubbleSort();
        $('#desc1').text('箭头指向当前比较数');
        $('#pointr').css('left', '10.25vw');
        $('#pointl').css('left', '21.25vw');
        $('#point').css('left', '62vw');
    }
    else if ($('#shS').prop('checked')) {
        sorter = new ShellSort();
        $('#desc1').text('红色方块位置索引值表示gap的大小');
        $('#pointr').css('left', '10.25vw');
        $('#pointl').css('left', '21.25vw');
        $('#point').css('left', '35vw');
    }

}

//let sorter = new SelectSort();

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