class ViewControl {
    private rectList: JQuery<HTMLElement>[];
    private pointList: JQuery<HTMLElement>[] = [];
    private pointLocationX: number[] = [0, 1, 1];
    private numList = [49, 96, 32, 128, 57, 64, 22];
    private selectedType: string = 'InsertSort';
    private constructor() {
        this.rectList = ViewControl.buildDivElement(this.numList);
        this.rectList.forEach(el => {
            $('#val-area').append(el);
        });
        $('#submit-btn').on('click', () => {
            this.updateValues();
        });
        this.pointList.push($('#point-l'));
        this.pointList.push($('#point-r'));
        this.pointList.push($('#point'));

        $('#start').on('click', () => {
            let radiolist = $('input[name="select-type"]');
            for (let i = 0; i < radiolist.length; i++) {
                let tmp = <HTMLInputElement>radiolist[i];
                if (tmp.checked) {
                    this.selectedType = tmp.value;
                    break;
                }
            }
            console.log(this.selectedType);
            try {
                let sort: Sort = this.getSorter();
                sort.sort();
            }
            catch(er) {
                alert(er.toString());
            }
            
        });
    }
    private getSorter = (): Sort => {
        let sort: Sort;
        switch (this.selectedType) {
            case 'InsertSort': sort = new InsertSort(this.numList, this); break;
            case 'SelectSort': sort = new SelectSort(this.numList, this); break;
            case 'BubbleSort': sort = new BubbleSort(this.numList, this); break;
            default: throw new Error("啊咧，这个还未实现的");
        }
        return sort;
    }
    private static inViewControl: ViewControl;
    public static getViewControl = (): ViewControl => {
        if (!ViewControl.inViewControl) {
            ViewControl.inViewControl = new ViewControl();
        }
        return ViewControl.inViewControl;
    }
    public static buildDivElement = (list: number[]): JQuery<HTMLElement>[] => {
        let tmp: JQuery<HTMLElement>[] = [];
        if (list.length > 7 || list.length < 1) {
            throw new Error('数组长度非法');
        }
        let num = 0;
        list.forEach(el => {
            tmp.push($(`<div class="blockbox rect${num}" id="rect${num}">${el}</div>`));
            num++;
        });
        return tmp;
    }
    public updateValues = (): void => {
        $('#val-area').children().remove();
        this.rectList.length = 0;
        let val_str = <string>$('#input-box').val();
        this.numList.length = 0;
        val_str.split(',').forEach(el => {
            this.numList.push(parseInt(el));
        });
        this.rectList = ViewControl.buildDivElement(this.numList);
        this.rectList.forEach(el => {
            $('#val-area').append(el);
        });
    }
    public delayItem = (index: number, delayTime: number): void => {
        this.rectList[index].animate({ left: `${index * 9 + 9}vw` }, { duration: delayTime, queue: true });
    }
    public delayAllItem = (delayTime: number): void => {
        this.rectList.forEach((el, index) => {
            el.animate({ left: `${index * 9 + 9}vw` }, { duration: delayTime, queue: true });
        });

    }
    public delayPointer = (index: number, delayTime: number): void => {
        let offset = 12;
        if (index == 1) offset = 10;
        if (index == 2) offset = 8;
        this.pointList[index].animate({ left: `${this.pointLocationX[index] * 9 + offset}vw` }, { duration: delayTime, queue: true });

    }
    public swapItem = (l: number, r: number): void => {
        this.rectList[l].animate({ left: `${r * 9 + 9}vw` }, { duration: 500, queue: true });
        this.rectList[r].animate({ left: `${l * 9 + 9}vw` }, { duration: 500, queue: true });
        for (let i = 0; i < this.rectList.length; i++) {
            if (i == l || i == r) {
                continue;
            }
            this.delayItem(i, 500);
        }
        let tmp = this.rectList[l];
        this.rectList[l] = this.rectList[r];
        this.rectList[r] = tmp;
    }

    public movePointer = (index: number, toIndex: number, delayTime: number): void => {
        this.pointLocationX[index] = toIndex;
        let offset = 12;
        if (index == 1) offset = 10;
        if (index == 2) offset = 8;
        this.pointList[index].animate({ left: `${toIndex * 9 + offset}vw` }, { duration: delayTime, queue: true });
    }


}

interface Sort {
    sort(): void;
    isFinished(): boolean;
    swap(l: number, r: number): void;
}

class InsertSort implements Sort {
    private numList: number[] = [];
    private finished = false;
    private viewControl: ViewControl;
    public constructor(nums: number[], vc: ViewControl) {
        this.numList = nums;
        this.viewControl = vc;
    }

    swap = (l: number, r: number): void => {
        let tmp = this.numList[l];
        this.numList[l] = this.numList[r];
        this.numList[r] = tmp;
        this.viewControl.swapItem(l, r);
    }

    sort = (): void => {
        for (let i = 1; i < this.numList.length; i++) {
            let j = i;
            while (j >= 1 && this.numList[j - 1] > this.numList[j]) {
                this.swap(j, j - 1);
                this.viewControl.movePointer(1, j - 1, 500);
                this.viewControl.delayPointer(2, 500);
                j--;
                this.viewControl.movePointer(0, j - 1, 500);
            }
            this.viewControl.movePointer(2, i + 1, 500);
            this.viewControl.delayPointer(1, 500);
            this.viewControl.delayPointer(0, 500);
            this.viewControl.delayAllItem(500);

        }
        this.finished = true;
    }

    isFinished = (): boolean => {
        return this.finished;
    }
}

class BubbleSort implements Sort {
    private numList: number[] = [];
    private finished = false;
    private viewControl: ViewControl;
    public constructor(nums: number[], vc: ViewControl) {
        this.numList = nums;
        this.viewControl = vc;
    }

    swap = (l: number, r: number): void => {
        let tmp = this.numList[l];
        this.numList[l] = this.numList[r];
        this.numList[r] = tmp;
        this.viewControl.swapItem(l, r);
    }

    sort = (): void => {
        for (let i = 0; i < this.numList.length - 1; i++) {
            for (let j = 0; j < this.numList.length - i - 1; j++) {
                this.viewControl.movePointer(0, j, 500);
                this.viewControl.movePointer(1, j + 1, 500);
                this.viewControl.delayPointer(2, 500);
                this.viewControl.delayAllItem(500);

                if (this.numList[j] > this.numList[j + 1]) {
                    this.swap(j, j + 1);
                    this.viewControl.movePointer(2, this.numList.length - i - 1, 500);
                    this.viewControl.delayPointer(0, 500);
                    this.viewControl.delayPointer(1, 500);
                }
            }
        }
        this.viewControl.movePointer(2, 0, 500);
        this.finished = true;
    }
    isFinished = (): boolean => {
        return this.finished;
    }
}

class SelectSort implements Sort {
    private numList: number[] = [];
    private finished = false;
    private viewControl: ViewControl;
    public constructor(nums: number[], vc: ViewControl) {
        this.numList = nums;
        this.viewControl = vc;
    }

    swap = (l: number, r: number): void => {
        let tmp = this.numList[l];
        this.numList[l] = this.numList[r];
        this.numList[r] = tmp;
        this.viewControl.swapItem(l, r);
    }

    sort = (): void => {
        let max_index = 0;
        this.viewControl.movePointer(2, this.numList.length - 1, 500);
        this.viewControl.delayPointer(0, 500);
        this.viewControl.movePointer(1, 0, 500);
        this.viewControl.delayAllItem(500);
        for (let i = 0; i < this.numList.length - 1; i++) {
            let j = 0;
            for (j = 0; j < this.numList.length - i; j++) {
                this.viewControl.movePointer(1, j, 500);
                this.viewControl.delayPointer(0, 500);
                this.viewControl.delayPointer(2, 500);
                this.viewControl.delayAllItem(500);
                if (this.numList[j] > this.numList[max_index]) {
                    max_index = j;
                    this.viewControl.movePointer(0, max_index, 500);
                    this.viewControl.delayPointer(1, 500);
                    this.viewControl.delayPointer(2, 500);
                    this.viewControl.delayAllItem(500);
                }
            }
            this.swap(this.numList.length - i - 1, max_index);
            this.viewControl.movePointer(0, 0, 500);
            this.viewControl.movePointer(1, 0, 500);
            this.viewControl.movePointer(2, this.numList.length - i - 1, 500);
            //this.viewControl.delayAllItem(500);
            max_index = 0;
        }
        this.viewControl.movePointer(0, 0, 500);
        this.viewControl.movePointer(1, 0, 500);
        this.viewControl.movePointer(2, 0, 500);
        this.finished = true;
    }
    isFinished = (): boolean => {
        return this.finished;
    }
}

window.onload = (): void => {
    var viewControl = ViewControl.getViewControl();
}

