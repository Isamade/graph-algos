# Maximum Subarray Sum in Python

def max_crossing_subarray(arr, left, mid, high):
    left_sum = float('-inf')
    total = 0
    max_left = mid
    for i in range(mid, left - 1, -1):
        total += arr[i]
        if total > left_sum:
            left_sum = total
            max_left = i

    right_sum = float('-inf')
    total = 0
    max_right = mid + 1
    for j in range(mid + 1, high + 1):
        total += arr[j]
        if total > right_sum:
            right_sum = total
            max_right = j

    return (max_left, max_right, left_sum + right_sum)

def max_subarray_sum(arr, low, high):
    if low == high:
        return (low, high, arr[low])
    mid = (low + high) // 2
    left_low, left_high, left_sum = max_subarray_sum(arr, low, mid)
    right_low, right_high, right_sum = max_subarray_sum(arr, mid + 1, high)
    cross_low, cross_high, cross_sum = max_crossing_subarray(arr, low, mid, high)

    if left_sum >= right_sum and left_sum >= cross_sum:
        return (left_low, left_high, left_sum)
    elif right_sum >= left_sum and right_sum >= cross_sum:
        return (right_low, right_high, right_sum)
    else:
        return (cross_low, cross_high, cross_sum)
    
arr = [-2,1,-3,4,-1,2,1,-5,4]
low, high, max_sum = max_subarray_sum(arr, 0, len(arr) - 1)
print(f"Maximum subarray found between indices {low} and {high} with sum {max_sum}")