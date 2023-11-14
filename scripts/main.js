function getBorderRadius() {
    const element = document.getElementById('border');
    const borderRadius = element.style.borderRadius
    return borderRadius
}


function putBorderRadius() {
    let borderRadius = getBorderRadius();
    const output = document.getElementById('output');
    output.value = borderRadius;
}


function getBorderRadiusInput() {
    const inputValue = document.getElementById('input').value + 'px'
    return inputValue
}


function setBorderRadius() {
    const inputValue = getBorderRadiusInput();
    const element = document.getElementById('border');
    element.style.borderRadius = inputValue;
    putBorderRadius();
}


function copyToClipboard() {
    const borderProperty = document.getElementById('border-box');
    const paragraphs = borderProperty.querySelectorAll('p');

    let textToCopy = '';
    paragraphs.forEach((paragraph) => {
        textToCopy += paragraph.innerText + '\n';
    });

    navigator.clipboard.writeText(textToCopy).then(function() {
        const toast = document.getElementById('toastMessage');
        toast.style.display = 'block';
        setTimeout(function() {
            toast.style.display = 'none';
        }, 3000);})
        .catch(function(err) {
            console.error('Не удалось скопировать текст: ', err);
        });
}


function getAllAnglesInput() {
    let leftTop = document.getElementById('left-top');
    let rightTop = document.getElementById('right-top');
    let leftBottom = document.getElementById('left-bottom');
    let rightBottom = document.getElementById('right-bottom');

    angles = {
        'leftTop': leftTop,
        'rightTop': rightTop,
        'leftBottom': leftBottom,
        'rightBottom': rightBottom
    }

    return angles
}


function getAllAnglesRanges() {
    let leftTopRange = document.getElementById('left-top-range');
    let rightTopRange = document.getElementById('right-top-range');
    let leftBottomRange = document.getElementById('left-bottom-range');
    let rightBottomRange = document.getElementById('right-bottom-range');

    anglesRanges = {
        'leftTopRange': leftTopRange,
        'rightTopRange': rightTopRange,
        'leftBottomRange': leftBottomRange,
        'rightBottomRange': rightBottomRange
    }

    return anglesRanges
}


function setAllAngles() {
    let angles = getAllAnglesInput();
    let anglesRanges = getAllAnglesRanges();
    const element = document.getElementById('border')
    element.style.borderTopLeftRadius = angles['leftTop'].value + 'px';
    element.style.borderTopRightRadius = angles['rightTop'].value + 'px';
    element.style.borderBottomLeftRadius = angles['leftBottom'].value + 'px';
    element.style.borderBottomRightRadius = angles['rightBottom'].value + 'px';

    anglesRanges['leftTopRange'].value = angles['leftTop'].value;
    anglesRanges['rightTopRange'].value = angles['rightTop'].value;
    anglesRanges['leftBottomRange'].value = angles['leftBottom'].value;
    anglesRanges['rightBottomRange'].value = angles['rightBottom'].value;

    showBorderProperty();
}


function setAllAnglesRanges() {
    let anglesRanges = getAllAnglesRanges();
    let angles = getAllAnglesInput();
    const element = document.getElementById('border');
    element.style.borderTopLeftRadius = anglesRanges['leftTopRange'].value + 'px';
    element.style.borderTopRightRadius = anglesRanges['rightTopRange'].value + 'px';
    element.style.borderBottomLeftRadius = anglesRanges['leftBottomRange'].value + 'px';
    element.style.borderBottomRightRadius = anglesRanges['rightBottomRange'].value + 'px';

    angles['leftTop'].value = anglesRanges['leftTopRange'].value;
    angles['rightTop'].value = anglesRanges['rightTopRange'].value;
    angles['leftBottom'].value = anglesRanges['leftBottomRange'].value;
    angles['rightBottom'].value = anglesRanges['rightBottomRange'].value;

    showBorderProperty();
}


function showBorderProperty() {
    let angles = getAllAnglesInput();
    let borderTopLeft = `border-top-left-radius: ${angles['leftTop'].value}px;`;
    let borderTopRight = `border-top-right-radius: ${angles['rightTop'].value}px;`;
    let borderBottomLeft = `border-bottom-left-radius: ${angles['leftBottom'].value}px;`;
    let borderBottomRight = `border-bottom-right-radius: ${angles['rightBottom'].value}px;`;
    let borderRadius = `border-radius: ${angles['leftTop'].value}px;`

    const borderBox = document.getElementById('border-box');
    borderBox.innerHTML = '';

    if (angles['leftTop'].value === angles['rightTop'].value && 
        angles['leftTop'].value === angles['leftBottom'].value && 
        angles['leftTop'].value === angles['rightBottom'].value) {
        let newParagraph = document.createElement('p');
        newParagraph.textContent = borderRadius;
        borderBox.appendChild(newParagraph);
    } else {
        let borderList = [borderTopLeft, borderTopRight, borderBottomLeft, borderBottomRight];
        
        borderList.forEach((element) => {
            let newParagraph = document.createElement('p');
            newParagraph.textContent = element;
            borderBox.appendChild(newParagraph);
        });
    }
}


function onlyNumberKey(event) {
    const charCode = (event.which) ? event.which : event.keyCode;
    
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
        return false;
    }
    
    return true;
}


const inputElements = document.getElementsByClassName('input');
for (let i = 0; i < inputElements.length; i++) {
    inputElements[i].addEventListener('input', setAllAngles);
}

const inputRangeElements = document.getElementsByClassName('input-range')
for (let i = 0; i< inputRangeElements.length; i++) {
    inputRangeElements[i].addEventListener('input', setAllAnglesRanges)
}

const output = document.getElementById('border-box');
output.addEventListener('click', copyToClipboard)

window.onload = function() {
    document.getElementById('left-top').value = '0';
    document.getElementById('right-top').value = '0';
    document.getElementById('left-bottom').value = '0';
    document.getElementById('right-bottom').value = '0';

    document.getElementById('left-top-range').value = '0';
    document.getElementById('right-top-range').value = '0';
    document.getElementById('left-bottom-range').value = '0';
    document.getElementById('right-bottom-range').value = '0';
};