---
title: "Why Writing Software Tests?"
date: 2026-08-12T21:15:03+03:30
draft: false

description: "Writing tests is an important part of developing good software. It is also, admittedly, kind of boring."

summary: "In this post, I'm going to attempt to convince you why the boring task of writing tests might actually be more beneficial than you think. Tests don't magically make your software perfect, but they can make changing, refactoring, and maintaining it much safer. And yes, they are still boring."

categories: ["programming"]

tags: ["tests", "dev", "engineering"]

series: ['Software automated Tests']

featured_image: "cover.png"

showReadingTime: true

toc: true
---

# Writing Tests, What Is It?

Well, if you're a developer, there's a very small chance you've never heard of software testing. More likely, you've heard of it but never cared enough to look it up.
Or, even more probably, you know what it is, you've given it a chance at least once, found it boring, cumbersome, and then quietly moved on with your life.

You're not entirely wrong, though.

Writing tests can be boring. It can feel repetitive. It can feel like you're writing code to test the code you just wrote, which sounds suspiciously like creating extra work for yourself. But it's not useless. At least, not most of the time!

I assume you already know what testing is. Or maybe your memory is like a healthy normal human's and automatically forgets boring things.
(Okay, I'm bullying testing at this point lol)

Let's start from the beginning anyway.

## What Is Software Testing?

Simply put, software testing means checking whether your software behaves the way you expect it to.

Notice that I said **the way you expect it to**, rather than simply "whether the code works."

That's an important distinction.

Imagine you have this function:

```python
def multiply(a, b):
    return a * b
```

You might want to make sure:

```python
assert multiply(2, 3) == 6
assert multiply(5, 4) == 20
assert multiply(-2, 3) == -6
```

You might also want to decide what should happen with invalid input.

Should this work?

```python
multiply("2", 3)
```

Should it raise an error?

Should it convert `"2"` into `2`?

Should strings simply not be supported?

The test isn't supposed to decide what your software _should_ do. **You decide that first. The test makes that expectation executable.**

And this is where tests become useful.

A test is essentially a small, automated question:

> "If I give the program X, do I get the behavior I expect?"

There are many kinds of software tests. In this article, I'm going to focus mainly on unit tests.

## Unit Tests

A unit test focuses on a small, isolated piece of functionality.

Usually, that means testing a function, method, or small component without involving a bunch of other parts of the system.

For example, imagine we have:

```python
def calculate_discount(price, discount):
    return price - (price * discount)
```

We could write:

```python
def test_calculate_discount():
    assert calculate_discount(100, 0.2) == 80
```

That's a pretty boring test.
But that's kind of the point.
We're not trying to recreate the entire application here. We're simply checking one piece of behavior.

We could add a few more cases:

```python
def test_calculate_discount():
    assert calculate_discount(100, 0.2) == 80
    assert calculate_discount(50, 0.1) == 45
    assert calculate_discount(200, 0) == 200
```

And perhaps we decide that a discount greater than 100% shouldn't be allowed:

```python
def calculate_discount(price, discount):
    if discount < 0 or discount > 1:
        raise ValueError("Discount must be between 0 and 1")

    return price - (price * discount)
```

Now we can test that too:

```python
import pytest

def test_calculate_discount_rejects_invalid_discount():
    with pytest.raises(ValueError):
        calculate_discount(100, 1.5)
```

Suddenly, our tests are describing the behavior of our function.
That's one of the underrated benefits of tests.

Someone who has never seen this code before can look at the tests and quickly understand:

- a 20% discount on 100 is 80;
- a 10% discount on 50 is 45;
- 0% discount changes nothing;
- discounts outside the range of 0–100% are invalid.

The tests aren't perfect documentation, but they're **executable documentation**.

And yes, that's a fancy way of saying "documentation that can scream at you when you break it."

## But Why Do We Need Tests?

Okay, here's the actual question.

Why?

Why spend ten minutes writing tests for something that took five minutes to implement?

Why write:

```python
assert calculate_discount(100, 0.2) == 80
```

when you can simply run the application and see that it works?

Well...

Because the application is going to change. That's the part that matters.

Your code today is not necessarily going to be your code six months from now.

Maybe you add a new feature. Maybe you refactor something. Maybe another developer changes your function. Maybe _you_ change your function after completely forgetting why you wrote it that way.

And that's when tests start earning their salary.

### 1. Catch Mistakes Earlier

Imagine you originally have:

```python
def calculate_discount(price, discount):
    return price - (price * discount)
```

Everything is working.

Six months later, you refactor it:

```python
def calculate_discount(price, discount):
    return price + (price * discount)
```

Congratulations.

You've invented a **discount that makes things more expensive.**

If you have tests:

```python
def test_calculate_discount():
    assert calculate_discount(100, 0.2) == 80
```

you get:

```text
FAILED test_discount.py

Expected: 80
Received: 120
```

The mistake is caught immediately.

Without the test, you might discover it much later. Maybe during manual testing. Maybe in production. Maybe when a customer asks why their "discount" increased the price. I'd rather have the terminal yell at me.

Tests don't prevent every possible bug. They don't magically make programmers competent. What they do is **catch certain mistakes earlier**. And catching a mistake five seconds after making it is generally much cheaper than discovering it five weeks later.

### 2. Prevent Regressions

This is probably one of the biggest reasons I care about automated tests.

A **regression** is when something that previously worked stops working because of a change.

Imagine you have a login system. It works. You add a "Remember Me" feature. It works. You refactor the authentication code. Suddenly, normal login is broken.

That's a regression.

The frustrating part is that you didn't intentionally break login. You were trying to improve something else. This is where tests become a safety net.

For example:

```python
def test_user_can_login_with_correct_password():
    user = User("alice", "correct-password")

    assert login(user, "correct-password") is True
```

Now you can change the authentication code and run your tests.

If that innocent little refactor breaks login:

```text
FAILED test_login.py

Expected: True
Received: False
```

Your test suite just told you:

> "Hey buddy, you broke something."

Thank you, lil T!

### 3. Help Other Developers Understand Your Code

Imagine you join an unfamiliar project.

You find this function:

```python
def calculate_shipping(order):
    ...
```

You have no idea what it does.

Then you find these tests:

```python
def test_free_shipping_for_orders_over_100():
    order = Order(total=150)

    assert calculate_shipping(order) == 0


def test_shipping_cost_is_10_for_small_orders():
    order = Order(total=50)

    assert calculate_shipping(order) == 10
```

Now you have some idea of the business rules.
Orders above 100 get free shipping. Smaller orders cost 10. The tests are telling you what the code is expected to do.

This becomes particularly useful in large codebases where the original developer isn't around anymore.

And let's be honest,
Sometimes the original developer **is** around. It's you. You just don't remember what you were thinking six months ago.

Future-you is another developer. Future-you deserves tests.

### 4. Refactoring Becomes Less Scary

Refactoring means changing the internal structure of your code without intentionally changing its external behavior.

Maybe you start with this:

```python
def get_total(price, tax):
    return price + (price * tax)
```

Later, you decide the code should be organized differently.

You refactor it:

```python
def calculate_tax(price, tax_rate):
    return price * tax_rate


def get_total(price, tax_rate):
    return price + calculate_tax(price, tax_rate)
```

The implementation changed, but the expected behavior didn't.

If you have tests:

```python
def test_get_total():
    assert get_total(100, 0.2) == 120
```

you can refactor with a little more confidence.
The tests don't prove that your refactoring is perfect.
But they give you some evidence that you didn't accidentally change behavior.

And that feeling is surprisingly valuable.

### 5. Get Dopamine by Seeing Your Tests Pass

No I'm not gonna write about it. You gotta do it yourself to feel.

Just don't let your craving for seeing `tests pass` drive you to write silly tests!

## But Tests Aren't Magic

At this point, you might be thinking:

> "Okay, so if I write enough tests, my software is guaranteed to be correct?"

No.

Absolutely not.

Tests are not magic.
A passing test means that your code produced the behavior that the test expected.
If your test is wrong, your code can be wrong while every test still passes.

For example:

```python
def multiply(a, b):
    return a + b
```

And then you write:

```python
def test_multiply():
    assert multiply(2, 3) == 5
```

Congratulations. Your test passed.
Your multiplication function is still broken.
The problem isn't that testing failed.

The problem is that **the test described the wrong behavior.**

## Conclusion

If you're writing a tiny script that you're going to run once and throw away, spending an hour building an elaborate testing system might be ridiculous.
Tests take time to write.
They take time to run.
They have to be maintained.

But if you're building a payment system that will handle thousands or millions of transactions, however...
Maybe write the test.
Maybe write several.
As your project gets bigger and more complex, writing tests saves you time eventually, and if I failed to convince you by now, you will learn it the hard way (As I did; I call it Yasin's arch).
It guarantees your code operates as **_YOU_** intended. It's peace of mind, huh?

This post is just the beginning of this series. In upcoming parts, we will cover other important concepts like Integration tests, E2E testing, TDD and ...

_Thanks for reading this article, I hope you found it, useful._
And Yes, I know tests are still boring!

I finish this article with a quote:

> “Code without tests is broken by design.”
>
> — Jacob Kaplan-Moss
