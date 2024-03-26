

export default function getImage(image) {
    if (typeof window !== 'undefined') {
        return window.location.origin + `/storage/` + image;
    } else {
        // Return a default value or handle the situation
        return `/storage/` + image;
    }
}
