const form = document.getElementById('predictionForm');
const button = document.getElementById('predictButton');
const buttonLabel = document.getElementById('buttonLabel');
const exampleButton = document.getElementById('fillExample');
const errorMessage = document.getElementById('errorMessage');
const price = document.getElementById('predictedPrice');
const description = document.getElementById('resultDescription');
const tag = document.getElementById('resultTag');
const summary = document.getElementById('resultSummary');
const resultCard = document.getElementById('resultCard');
const completionLabel = document.getElementById('completionLabel');
const completionProgress = document.getElementById('completionProgress');
const numericFields = ['carat', 'depth', 'table', 'x', 'y', 'z'];
const featureFields = [...numericFields, 'cut', 'color', 'clarity'];
let revision = 0;

function updateCompletion() {
    const completed = featureFields.filter(key => {
        const field = form.elements.namedItem(key);
        return field.value !== '' && field.validity.valid;
    }).length;
    completionLabel.textContent = `${completed} / 9 özellik girildi`;
    completionProgress.value = completed;
}

function clearResult() {
    revision += 1;
    price.innerHTML = '— <span>USD</span>';
    tag.textContent = 'Hazır olduğunuzda';
    description.textContent = 'Özellikleri doldurun; tahmininiz burada görünsün.';
    summary.hidden = true;
    errorMessage.hidden = true;
    updateCompletion();
}
form.addEventListener('input', clearResult);
form.addEventListener('change', clearResult);
form.addEventListener('reset', () => {
    // The browser restores field values after dispatching the reset event.
    queueMicrotask(clearResult);
});
exampleButton.addEventListener('click', () => {
    const example = { carat: 0.23, cut: 'Ideal', color: 'E', clarity: 'SI2', depth: 61.5, table: 55, x: 3.95, y: 3.98, z: 2.43 };
    for (const [key, value] of Object.entries(example)) form.elements.namedItem(key).value = value;
    clearResult();
    form.elements.namedItem('carat').focus();
});
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (button.disabled || !form.reportValidity()) return;
    const payload = Object.fromEntries(new FormData(form));
    for (const key of numericFields) payload[key] = Number(payload[key]);
    if (numericFields.some(key => !Number.isFinite(payload[key]) || payload[key] <= 0)) {
        errorMessage.textContent = 'Lütfen tüm sayısal alanlara sıfırdan büyük, geçerli değerler girin.';
        errorMessage.hidden = false;
        return;
    }
    clearResult();
    const submittedRevision = revision;
    button.disabled = true;
    exampleButton.disabled = true;
    buttonLabel.textContent = 'Hesaplanıyor…';
    tag.textContent = 'Hesaplanıyor';
    resultCard.setAttribute('aria-busy', 'true');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal: controller.signal
        });
        if (!response.ok) throw new Error(response.status === 422
            ? 'Girdiğiniz değerler kabul edilmedi. Lütfen alanları kontrol edin.'
            : 'Tahmin hesaplanamadı. Lütfen tekrar deneyin.');
        const data = await response.json();
        if (typeof data.predicted_price !== 'number' || !Number.isFinite(data.predicted_price) || data.predicted_price < 0) {
            throw new Error('Model geçerli bir fiyat döndürmedi. Lütfen değerleri kontrol edip tekrar deneyin.');
        }
        if (revision !== submittedRevision) return;
        price.textContent = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(data.predicted_price) + ' ';
        const currency = document.createElement('span');
        currency.textContent = 'USD';
        price.append(currency);
        tag.textContent = 'Tahmin tamamlandı';
        description.textContent = 'Girdiğiniz özellikler için modelin hesapladığı tahmini fiyat.';
        summary.textContent = `${payload.carat} ct · ${payload.cut} kesim · ${payload.color} renk · ${payload.clarity} berraklık`;
        summary.hidden = false;
        if (window.matchMedia('(max-width: 800px)').matches) {
            resultCard.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
        }
    } catch (error) {
        if (revision !== submittedRevision) return;
        tag.textContent = 'Tekrar deneyin';
        errorMessage.textContent = error.name === 'AbortError'
            ? 'İstek zaman aşımına uğradı. Lütfen tekrar deneyin.'
            : error instanceof TypeError ? 'Sunucuya ulaşılamadı. Bağlantınızı kontrol edip tekrar deneyin.' : error.message;
        errorMessage.hidden = false;
    } finally {
        clearTimeout(timeout);
        button.disabled = false;
        exampleButton.disabled = false;
        buttonLabel.textContent = 'Tahmini fiyatı hesapla';
        resultCard.removeAttribute('aria-busy');
    }
});
updateCompletion();
