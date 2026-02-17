export const codeData = {
  bubble: {
    cpp: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
    java: `void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
    python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break`,
  },
  selection: {
    cpp: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++)
            if (arr[j] < arr[minIdx]) minIdx = j;
        swap(arr[i], arr[minIdx]);
    }
}`,
    java: `void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++)
            if (arr[j] < arr[minIdx]) minIdx = j;
        int temp = arr[minIdx];
        arr[minIdx] = arr[i];
        arr[i] = temp;
    }
}`,
    python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]`,
  },
  insertion: {
    cpp: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i], j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
    java: `void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i], j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
    python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key`,
  },
  merge: {
    cpp: `void merge(int arr[], int l, int m, int r) {
    vector<int> left(arr+l, arr+m+1), right(arr+m+1, arr+r+1);
    int i=0, j=0, k=l;
    while (i<left.size() && j<right.size())
        arr[k++] = (left[i]<=right[j]) ? left[i++] : right[j++];
    while (i<left.size()) arr[k++] = left[i++];
    while (j<right.size()) arr[k++] = right[j++];
}
void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = (l + r) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m+1, r);
        merge(arr, l, m, r);
    }
}`,
    java: `void mergeSort(int[] arr, int l, int r) {
    if (l < r) {
        int m = (l + r) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
    python: `def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        L, R = arr[:mid], arr[mid:]
        merge_sort(L); merge_sort(R)
        i = j = k = 0
        while i < len(L) and j < len(R):
            if L[i] <= R[j]: arr[k] = L[i]; i += 1
            else: arr[k] = R[j]; j += 1
            k += 1
        arr[k:] = L[i:] or R[j:]`,
  },
  quick: {
    cpp: `int partition(int arr[], int low, int high) {
    int pivot = arr[high], i = low - 1;
    for (int j = low; j < high; j++)
        if (arr[j] <= pivot) swap(arr[++i], arr[j]);
    swap(arr[i+1], arr[high]);
    return i + 1;
}
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
    java: `void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
    python: `def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i+1], arr[high] = arr[high], arr[i+1]
    return i + 1`,
  },
  radix: {
    cpp: `void countSort(int arr[], int n, int exp) {
    vector<int> output(n); int count[10] = {0};
    for (int i=0; i<n; i++) count[(arr[i]/exp)%10]++;
    for (int i=1; i<10; i++) count[i]+=count[i-1];
    for (int i=n-1; i>=0; i--) output[--count[(arr[i]/exp)%10]] = arr[i];
    for (int i=0; i<n; i++) arr[i] = output[i];
}
void radixSort(int arr[], int n) {
    int m = *max_element(arr, arr+n);
    for (int exp=1; m/exp>0; exp*=10) countSort(arr,n,exp);
}`,
    java: `void radixSort(int[] arr) {
    int max = Arrays.stream(arr).max().getAsInt();
    for (int exp = 1; max / exp > 0; exp *= 10)
        countSort(arr, exp);
}`,
    python: `def radix_sort(arr):
    max_val = max(arr)
    exp = 1
    while max_val // exp > 0:
        counting_sort(arr, exp)
        exp *= 10`,
  },
  heap: {
    cpp: `void heapify(int arr[], int n, int i) {
    int largest = i, l = 2*i+1, r = 2*i+2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) { swap(arr[i], arr[largest]); heapify(arr, n, largest); }
}
void heapSort(int arr[], int n) {
    for (int i=n/2-1; i>=0; i--) heapify(arr, n, i);
    for (int i=n-1; i>0; i--) { swap(arr[0], arr[i]); heapify(arr, i, 0); }
}`,
    java: `void heapSort(int[] arr) {
    int n = arr.length;
    for (int i = n/2-1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n-1; i > 0; i--) {
        int temp = arr[0]; arr[0] = arr[i]; arr[i] = temp;
        heapify(arr, i, 0);
    }
}`,
    python: `def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)`,
  },
  shell: {
    cpp: `void shellSort(int arr[], int n) {
    for (int gap=n/2; gap>0; gap/=2)
        for (int i=gap; i<n; i++) {
            int temp=arr[i], j=i;
            while (j>=gap && arr[j-gap]>temp) { arr[j]=arr[j-gap]; j-=gap; }
            arr[j]=temp;
        }
}`,
    java: `void shellSort(int[] arr) {
    for (int gap = arr.length/2; gap > 0; gap /= 2)
        for (int i = gap; i < arr.length; i++) {
            int temp = arr[i], j = i;
            while (j >= gap && arr[j-gap] > temp) { arr[j] = arr[j-gap]; j -= gap; }
            arr[j] = temp;
        }
}`,
    python: `def shell_sort(arr):
    gap = len(arr) // 2
    while gap > 0:
        for i in range(gap, len(arr)):
            temp = arr[i]; j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]; j -= gap
            arr[j] = temp
        gap //= 2`,
  },
  counting: {
    cpp: `void countingSort(int arr[], int n) {
    int max = *max_element(arr, arr+n);
    vector<int> count(max+1, 0), output(n);
    for (int i=0; i<n; i++) count[arr[i]]++;
    for (int i=1; i<=max; i++) count[i]+=count[i-1];
    for (int i=n-1; i>=0; i--) output[--count[arr[i]]]=arr[i];
    for (int i=0; i<n; i++) arr[i]=output[i];
}`,
    java: `void countingSort(int[] arr) {
    int max = Arrays.stream(arr).max().getAsInt();
    int[] count = new int[max + 1];
    for (int x : arr) count[x]++;
    for (int i = 1; i <= max; i++) count[i] += count[i-1];
    int[] output = new int[arr.length];
    for (int i = arr.length-1; i >= 0; i--) output[--count[arr[i]]] = arr[i];
    System.arraycopy(output, 0, arr, 0, arr.length);
}`,
    python: `def counting_sort(arr):
    max_val = max(arr)
    count = [0] * (max_val + 1)
    for x in arr: count[x] += 1
    idx = 0
    for i, c in enumerate(count):
        for _ in range(c):
            arr[idx] = i; idx += 1`,
  },
  bucket: {
    cpp: `void bucketSort(float arr[], int n) {
    vector<vector<float>> b(n);
    for (int i=0; i<n; i++) b[n*arr[i]].push_back(arr[i]);
    for (auto& bucket : b) sort(bucket.begin(), bucket.end());
    int idx=0;
    for (auto& bucket : b) for (float x : bucket) arr[idx++]=x;
}`,
    java: `void bucketSort(int[] arr) {
    int max = Arrays.stream(arr).max().getAsInt();
    List<List<Integer>> buckets = new ArrayList<>();
    for (int i = 0; i <= max/10; i++) buckets.add(new ArrayList<>());
    for (int x : arr) buckets.get(x/10).add(x);
    int idx = 0;
    for (List<Integer> b : buckets) { Collections.sort(b); for (int x : b) arr[idx++] = x; }
}`,
    python: `def bucket_sort(arr):
    max_val = max(arr)
    buckets = [[] for _ in range(max_val // 10 + 1)]
    for x in arr: buckets[x // 10].append(x)
    idx = 0
    for b in buckets:
        b.sort()
        for x in b: arr[idx] = x; idx += 1`,
  },
    linear: {
    cpp: `int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target)
            return i; // element found at index i
    }
    return -1; // element not found
}`,
    java: `int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i; // element found
        }
    }
    return -1; // not found
}`,
    python: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # element found
    return -1  # not found`,
  },

  binary: {
    cpp: `int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (arr[mid] == target)
            return mid; // element found
        else if (arr[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }
    return -1; // element not found
}`,
    java: `int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (arr[mid] == target) {
            return mid; // found
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1; // not found
}`,
    python: `def binary_search(arr, target):
    left = 0
    right = len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid  # found
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1  # not found`,
  },
};
