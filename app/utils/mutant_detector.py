def is_mutant(dna):
    n = len(dna)
    for sequence in dna:
        if len(sequence) != n:
            raise ValueError("Todas las cadenas de ADN deben tener la misma longitud")
    
    sequences = 0

    def count_sequences(line):
        count = 0
        current_char = ''
        current_streak = 0

        for char in line:
            if char == current_char:
                current_streak += 1
            else:
                current_char = char
                current_streak = 1
            
            if current_streak == 4:
                count += 1
                current_streak = 0  

        return count

    for i in range(n):
        sequences += count_sequences(dna[i])  
        sequences += count_sequences(''.join(dna[j][i] for j in range(n))) 

    for i in range(n):
        for j in range(n):
            if i + 3 < n and j + 3 < n:  
                sequences += count_sequences(dna[i][j] + dna[i + 1][j + 1] + dna[i + 2][j + 2] + dna[i + 3][j + 3])
            if i + 3 < n and j - 3 >= 0:  
                sequences += count_sequences(dna[i][j] + dna[i + 1][j - 1] + dna[i + 2][j - 2] + dna[i + 3][j - 3])

    return sequences > 1